# REST Countries API

Self-hosted .NET 9 backend that replaces `restcountries.com` for the Frontend Mentor REST Countries challenge. Serves a paginated, searchable, filterable dataset of 250 countries from a SQLite database, with OpenAPI documentation and production-grade middleware.

## Tech stack

- **.NET 9 / ASP.NET Core** — minimal APIs, top-level statements
- **Entity Framework Core 9** with **SQLite** — file-based database, zero external dependencies
- **Microsoft.AspNetCore.OpenApi** + **Scalar** — interactive API documentation
- **Output caching** — server-side response cache (60s TTL)
- **Health checks** — `/health` endpoint with database connectivity probe
- **CORS** — configurable allow-list, sourced from environment variables in production
- **ProblemDetails** (RFC 7807) — uniform error response shape across all failure paths
- **Forwarded headers** — proxy-aware request handling for cloud deployments
- **Docker** — multi-stage build, runs as non-root `app` user

## Quick start

```powershell
cd backend
dotnet run
```

The service listens on `http://localhost:5128`. Migrations apply on startup; the database seeds itself from `Data/countries.json` on first run (~1s, idempotent).

Interactive docs: open `http://localhost:5128/scalar/v1` in a browser.

## Run with Docker locally

```powershell
docker build -t rest-countries-api .
docker run --rm -p 8080:8080 rest-countries-api
```

Then `http://localhost:8080/countries`.

## API reference

### `GET /countries`

Paginated, optionally filtered country list.

| Query param | Type | Default | Notes |
|---|---|---|---|
| `name` | string | — | Substring match (case-insensitive) on country name |
| `region` | string | — | Exact match (case-insensitive) on region |
| `page` | int | `1` | Clamped to >= 1 |
| `pageSize` | int | `20` | Clamped to [1, 100] |

**Example:** `GET /countries?name=ger&region=europe&page=1&pageSize=10`

```json
{
  "items": [
    {
      "alpha3Code": "DEU",
      "name": "Germany",
      "capital": "Berlin",
      "region": "Europe",
      "population": 83240525,
      "flags": {
        "svg": "https://flagcdn.com/de.svg",
        "png": "https://flagcdn.com/w320/de.png"
      }
    }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 1,
  "totalPages": 1
}
```

### `GET /countries/{code}`

Fetch a single country by ISO alpha-3 code. Case-insensitive (`DEU`, `deu`, `Deu` all match).

Returns `200 OK` with the country object on hit, or `404 Not Found` with ProblemDetails JSON:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
  "title": "Country not found",
  "status": 404,
  "detail": "No country with alpha-3 code 'XYZ'."
}
```

### `GET /health`

Liveness + readiness probe. `200 Healthy` when the database is reachable, `503 Unhealthy` otherwise. Used by deploy platforms to gate traffic routing.

## Project structure

```
backend/
├── Data/
│   ├── countries.json          # Seed data, 250 countries (~400 KB)
│   ├── CountriesDbContext.cs   # EF Core DbContext + entity config
│   └── DbInitializer.cs        # Idempotent migration + seeding at startup
├── Migrations/                 # EF Core schema history (committed)
├── Models/
│   ├── Country.cs              # Country + Flags records (init-only)
│   └── PagedResult.cs          # Generic paginated wrapper
├── Services/
│   ├── ICountryService.cs      # Read-only contract
│   └── CountryService.cs       # EF Core query implementation
├── Properties/
│   └── launchSettings.json     # Dev-only launch profiles
├── Dockerfile                  # Multi-stage build for deployment
├── Program.cs                  # Composition root: DI, middleware, routes
├── RestCountriesApi.csproj
├── appsettings.json            # Default configuration
└── appsettings.Development.json
```

## Configuration

Settings flow through .NET's configuration hierarchy: `appsettings.json` < `appsettings.{Environment}.json` < environment variables < command-line args.

| Setting | Env var override | Default | Notes |
|---|---|---|---|
| `ConnectionStrings:Default` | `ConnectionStrings__Default` | `Data Source=countries.db` | SQLite file path |
| `Cors:AllowedOrigins[0]` | `Cors__AllowedOrigins__0` | `http://localhost:3000` | Add `__1`, `__2` for additional origins |
| `ASPNETCORE_ENVIRONMENT` | (env only) | `Development` | Set to `Production` on deploy |
| `ASPNETCORE_URLS` | (env only) | from `launchSettings.json` (dev) | The Dockerfile sets `http://+:8080` |

Secrets (real connection strings, third-party keys) belong in environment variables or .NET User Secrets — never `appsettings.json`. `appsettings.local.json` and `appsettings.*.local.json` are gitignored for local-only overrides.

## Database

EF Core with SQLite. Schema lives in `Migrations/` as code — the source of truth.

### Adding a migration after model changes

```powershell
dotnet ef migrations add <DescriptiveName>
```

The next `dotnet run` applies pending migrations automatically (via `DbInitializer.SeedAsync`).

### Inspecting data

`countries.db` is a standard SQLite file. [DB Browser for SQLite](https://sqlitebrowser.org/) opens it directly.

## Deployment

The included Dockerfile builds and runs on any container platform. Verified on Render's free tier.

**Required environment variables on the platform:**

| Variable | Value |
|---|---|
| `ASPNETCORE_ENVIRONMENT` | `Production` |
| `Cors__AllowedOrigins__0` | `https://<your-frontend-domain>` |

**Health check path** to configure on the platform: `/health`.

**Storage:** the SQLite database lives in the container's writable layer and re-seeds from `Data/countries.json` on every cold start. No persistent volume needed because all data is read-only.

## Architectural decisions

**SQLite over Postgres.** The dataset is ~400 KB, read-only, and never mutated through the API. SQLite eliminates the need for a separate database service and makes deployment a single container. EF Core abstracts the provider — swapping to Postgres later is a one-line change in `Program.cs`.

**Re-seed on startup vs. persistent volume.** Seeding takes ~1 second and the data is static. Persisting the database on a mounted volume adds operational overhead (mounts, backups, region pinning) for no behavioral benefit. The day user-generated data lands here, swap to managed Postgres.

**Output caching only (no `Cache-Control`).** `OutputCache` middleware hides repeat queries from the database for 60 seconds. Browser/CDN caching via `Cache-Control` headers is the next layer; deferred until traffic patterns warrant it.

**ProblemDetails for 404 and 5xx.** A single JSON contract across all failure modes — handler-thrown 404s, framework-level status code pages, and unhandled exceptions all serialize identically. Clients write one error parser.

**HTTPS redirect dev-only.** Production lives behind a reverse proxy that terminates TLS upstream and forwards plain HTTP. `ForwardedHeaders` middleware preserves the original scheme/IP. Running `UseHttpsRedirection` in production would cause a redirect loop with the proxy.

**Property-style records over positional records.** EF Core's owned-entity mapping (`OwnsOne(c => c.Flags)`) cannot bind owned navigations through positional record constructors. Property-style records (with `init`-only setters) preserve immutability and value equality while letting EF populate via the parameterless constructor.

**Silent clamping of `pageSize`.** Out-of-range values are clamped to `[1, 100]` rather than rejected with `400`. Trade-off: friendlier API, slight loss of strict input feedback. Reasonable for a public read-only resource where misuse is harmless.

**Primary constructor on `CountryService`.** C# 12 idiom. Less ceremony than a hand-written constructor, identical DI semantics. Used everywhere a single dependency suffices.

**`AsNoTracking()` everywhere.** All queries are read-only, so EF Core's change tracking is pure overhead. Disabling it cuts query time roughly 30%.

## What's not here (and why)

- **Authentication.** The data is public — no auth required.
- **Rate limiting.** Render's free tier instance and the OutputCache layer absorb most repeat traffic. Add `AddRateLimiter` if exposed to untrusted scale.
- **Structured logging stack** (Serilog, OpenTelemetry). Default `ILogger` is sufficient for a single-service deployment.
- **Detail-page extras** (native name, currencies, languages, borders, TLD). The seed JSON has the data; extend the `Country` record + add a migration when the frontend needs them.
- **Tests.** None yet. The service is small enough that integration tests against an in-memory SQLite would be the right starting point — `WebApplicationFactory<Program>` + `dotnet test`.
- **Strongly-typed `CorsOptions`.** Worth doing once a third config section appears.
