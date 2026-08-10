export const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export function canonicalRegion(value: string) {
  const normalized = value.trim().toLowerCase();
  return REGIONS.find((region) => region.toLowerCase() === normalized) ?? "";
}
