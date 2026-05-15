public record CountrySummary
{
    public string Alpha3Code { get; init; } = "";
    public string Name { get; init; } = "";
    public string? Capital { get; init; }
    public string Region { get; init; } = "";
    public long Population { get; init; }
    public Flags Flags { get; init; } = new();
}
