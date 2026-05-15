using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});
builder.Services.AddOpenApi();
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddDbContext<CountriesDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default"))
);
builder.Services.AddProblemDetails();
builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(b => b.Expire(TimeSpan.FromSeconds(60)));
});
builder.Services.AddHealthChecks().AddDbContextCheck<CountriesDbContext>();

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.UseHttpsRedirection();
}

app.UseForwardedHeaders();
app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseCors();
app.UseOutputCache();
app.MapHealthChecks("/health");

app.MapGet(
        "/countries",
        async (
            ICountryService countries,
            string? name,
            string? region,
            int page = 1,
            int pageSize = 20
        ) => await countries.SearchAsync(name, region, page, pageSize)
    )
    .CacheOutput()
    .WithName("SearchCountries")
    .WithSummary("Search countries with pagination, name, and region filters.")
    .WithDescription(
        "Returns a paginated list of countries. Filter by partial name match (case-insensitive) "
            + "and/or by exact region. `page` defaults to 1, `pageSize` defaults to 20 (max 100)."
    )
    .WithTags("Countries")
    .Produces<PagedResult<CountrySummary>>(StatusCodes.Status200OK);

app.MapGet(
        "/countries/{code}",
        async (string code, ICountryService countries) =>
        {
            var country = await countries.GetByCodeAsync(code);
            return country is null
                ? Results.Problem(
                    statusCode: 404,
                    title: "Country not found",
                    detail: $"No country with alpha-3 code '{code}'."
                )
                : Results.Ok(country);
        }
    )
    .CacheOutput()
    .WithName("GetCountryByCode")
    .WithSummary("Get a single country by its ISO alpha-3 code.")
    .WithDescription(
        "Looks up by the 3-letter country code (case-insensitive). Returns 404 ProblemDetails if no match."
    )
    .WithTags("Countries")
    .Produces<CountryDetail>(StatusCodes.Status200OK)
    .ProducesProblem(StatusCodes.Status404NotFound);

using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<CountriesDbContext>();
    var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
    await DbInitializer.SeedAsync(ctx, env);
}

app.Run();
