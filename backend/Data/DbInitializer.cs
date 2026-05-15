using System.Text.Json;
using Microsoft.EntityFrameworkCore;

public static class DbInitializer
{
    public static async Task SeedAsync(CountriesDbContext context, IWebHostEnvironment env)
    {
        await context.Database.MigrateAsync();

        if (await context.Countries.AnyAsync())
            return;

        var dataPath = Path.Combine(env.ContentRootPath, "Data", "countries.json");
        var json = await File.ReadAllTextAsync(dataPath);
        var seed =
            JsonSerializer.Deserialize<List<CountrySeed>>(
                json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            ) ?? [];

        context.Countries.AddRange(seed.Select(s => s.ToEntity()));
        await context.SaveChangesAsync();
    }
}
