using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddDbContext<CountriesDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default"))
);
builder.Services.AddProblemDetails();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.MapGet(
    "/countries",
    async (
        ICountryService countries,
        string? name,
        string? region,
        int page = 1,
        int pageSize = 20
    ) => await countries.SearchAsync(name, region, page, pageSize)
);

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
);

using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<CountriesDbContext>();
    var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
    await DbInitializer.SeedAsync(ctx, env);
}

app.Run();
