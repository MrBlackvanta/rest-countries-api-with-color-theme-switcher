public interface ICountryService
{
    Task<PagedResult<Country>> SearchAsync(string? name, string? region, int page, int pageSize);
    Task<Country?> GetByCodeAsync(string alpha3Code);
}
