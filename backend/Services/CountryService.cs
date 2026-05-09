using System.Text.Json;

public class CountryService : ICountryService
{
    private readonly List<Country> _countries;

    public CountryService()
    {
        var dataPath = Path.Combine(AppContext.BaseDirectory, "Data", "countries.json");
        var json = File.ReadAllText(dataPath);
        _countries =
            JsonSerializer.Deserialize<List<Country>>(
                json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            ) ?? [];
    }

    public IReadOnlyList<Country> GetAll() => _countries;
}
