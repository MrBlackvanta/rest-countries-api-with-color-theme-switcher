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

    public PagedResult<Country> Search(string? name, string? region, int page, int pageSize)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        IEnumerable<Country> query = _countries;

        if (!string.IsNullOrWhiteSpace(name))
            query = query.Where(c => c.Name.Contains(name, StringComparison.OrdinalIgnoreCase));

        if (!string.IsNullOrWhiteSpace(region))
            query = query.Where(c => c.Region.Equals(region, StringComparison.OrdinalIgnoreCase));

        var matched = query.OrderBy(c => c.Name).ToList();

        var items = matched.Skip((page - 1) * pageSize).Take(pageSize).ToList();

        return new PagedResult<Country>(items, page, pageSize, matched.Count);
    }
}
