public record Country(
    string Name,
    string? Capital,
    string Region,
    long Population,
    string Alpha3Code,
    Flags Flags
);

public record Flags(string Svg, string Png);
