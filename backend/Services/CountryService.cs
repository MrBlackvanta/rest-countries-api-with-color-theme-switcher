using Microsoft.EntityFrameworkCore;

public class CountryService(CountriesDbContext context) : ICountryService
{
    private const int MaxPageSize = 100;

    public async Task<PagedResult<Country>> SearchAsync(
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
            .ToListAsync();

        return new PagedResult<Country>(items, page, pageSize, total);
    }

    public Task<Country?> GetByCodeAsync(string alpha3Code)
    {
        var code = alpha3Code.ToUpperInvariant();
        return context.Countries.AsNoTracking().FirstOrDefaultAsync(c => c.Alpha3Code == code);
    }
}
