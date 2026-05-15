using Microsoft.EntityFrameworkCore;

public class CountryService(CountriesDbContext context) : ICountryService
{
    private const int MaxPageSize = 100;

    public async Task<PagedResult<CountrySummary>> SearchAsync(
        string? name,
        string? region,
        int page,
        int pageSize
    )
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, MaxPageSize);

        var query = context.Countries.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(name))
            query = query.Where(c => EF.Functions.Like(c.Name, $"%{name}%"));

        if (!string.IsNullOrWhiteSpace(region))
            query = query.Where(c => EF.Functions.Like(c.Region, region));

        var total = await query.CountAsync();

        var items = await query
            .OrderBy(c => c.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new CountrySummary
            {
                Alpha3Code = c.Alpha3Code,
                Name = c.Name,
                Capital = c.Capital,
                Region = c.Region,
                Population = c.Population,
                Flags = c.Flags,
            })
            .ToListAsync();

        return new PagedResult<CountrySummary>(items, page, pageSize, total);
    }

    public async Task<CountryDetail?> GetByCodeAsync(string alpha3Code)
    {
        var code = alpha3Code.ToUpperInvariant();
        var country = await context
            .Countries.AsNoTracking()
            .FirstOrDefaultAsync(c => c.Alpha3Code == code);

        if (country is null)
            return null;

        var borderNames =
            country.BorderCodes.Count == 0
                ? []
                : await context
                    .Countries.AsNoTracking()
                    .Where(c => country.BorderCodes.Contains(c.Alpha3Code))
                    .OrderBy(c => c.Name)
                    .Select(c => c.Name)
                    .ToListAsync();

        return new CountryDetail
        {
            Alpha3Code = country.Alpha3Code,
            Name = country.Name,
            NativeName = country.NativeName,
            Capital = country.Capital,
            Region = country.Region,
            Subregion = country.Subregion,
            Population = country.Population,
            Flags = country.Flags,
            TopLevelDomain = country.TopLevelDomain,
            Currencies = country.Currencies,
            Languages = country.Languages,
            Borders = borderNames,
        };
    }
}
