import { getAllCountries } from "@/lib/api/countries";
import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

// Request-time only: generating this at build time would fail every deploy the
// API happens to be asleep for.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const countries = await getAllCountries();

  return [
    { url: siteUrl, changeFrequency: "weekly" as const, priority: 1 },
    ...countries.map((country) => ({
      url: `${siteUrl}/country/${country.alpha3Code}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
