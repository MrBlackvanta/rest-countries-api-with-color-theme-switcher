using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSingleton<ICountryService, CountryService>();
builder.Services.AddDbContext<CountriesDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default"))
);

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
    (ICountryService countries, string? name, string? region, int page = 1, int pageSize = 20) =>
        countries.Search(name, region, page, pageSize)
);

using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<CountriesDbContext>();
    var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
    await DbInitializer.SeedAsync(ctx, env);
}

app.Run();
