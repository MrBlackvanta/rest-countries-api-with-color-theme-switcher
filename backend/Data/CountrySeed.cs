public record CountrySeed
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
    public List<NamedItem> Currencies { get; init; } = [];
    public List<NamedItem> Languages { get; init; } = [];
    public List<string> Borders { get; init; } = [];

    public Country ToEntity() =>
        new()
        {
            Alpha3Code = Alpha3Code,
            Name = Name,
            NativeName = NativeName,
            Capital = Capital,
            Region = Region,
            Subregion = Subregion,
            Population = Population,
            Flags = Flags,
            TopLevelDomain = TopLevelDomain,
            Currencies = Currencies.Select(c => c.Name).ToList(),
            Languages = Languages.Select(l => l.Name).ToList(),
            BorderCodes = Borders,
        };
}

public record NamedItem
{
    public string Name { get; init; } = "";
}
