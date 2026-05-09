using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

var countries = new List<Country>
{
    new("Germany", "Berlin", "Europe", 83_240_525, "https://flagcdn.com/de.svg"),
    new("Belgium", "Brussels", "Europe", 11_555_997, "https://flagcdn.com/be.svg"),
    new("Brazil", "Brasília", "Americas", 212_559_417, "https://flagcdn.com/br.svg"),
};

app.MapGet("/countries", () => countries);

app.Run();

record Country(string Name, string Capital, string Region, int Population, string FlagUrl);
