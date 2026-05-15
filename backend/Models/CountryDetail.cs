public record CountryDetail
{
    public string Alpha3Code { get; init; } = "";
    public string Name { get; init; } = "";
    public string NativeName { get; init; } = "";
    public string? Capital { get; init; }
    public string Region { get; init; } = "";
    public string? Subregion { get; init; }
    public long Population { get; init; }
    public Flags Flags { get; init; } = new();
    public List<string> TopLevelDomain { get; init; } = [];
    public List<string> Currencies { get; init; } = [];
    public List<string> Languages { get; init; } = [];
    public List<BorderCountry> Borders { get; init; } = [];
}
