/// <summary>Read-only access to the country dataset.</summary>
public interface ICountryService
{
    /// <summary>Search countries with optional name and region filters, paginated.</summary>
    /// <param name="name">Substring of the country name (case-insensitive). Null/empty disables.</param>
    /// <param name="region">Exact region name (case-insensitive). Null/empty disables.</param>
    /// <param name="page">1-based page number. Clamped to >= 1.</param>
    /// <param name="pageSize">Items per page. Clamped to [1, 100].</param>
    Task<PagedResult<Country>> SearchAsync(string? name, string? region, int page, int pageSize);

    /// <summary>Look up a single country by ISO alpha-3 code (case-insensitive). Returns null if not found.</summary>
    Task<Country?> GetByCodeAsync(string alpha3Code);
}
