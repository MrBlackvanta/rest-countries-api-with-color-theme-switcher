public interface ICountryService
{
    PagedResult<Country> Search(string? name, string? region, int page, int pageSize);
}
