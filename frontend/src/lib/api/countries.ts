import { Country, CountryDetail, PagedResult } from "@/types/country";

export async function getCountries(params: {
  name?: string;
  region?: string;
  page?: number;
}) {
  const url = new URL("/countries", process.env.API_URL);

  if (params.name) url.searchParams.set("name", params.name);
  if (params.region) url.searchParams.set("region", params.region);
  if (params.page) url.searchParams.set("page", params.page.toString());

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Countries request failed: ${res.status}`);
  return res.json() as Promise<PagedResult<Country>>;
}

export async function getCountryByCode(
  code: string,
): Promise<CountryDetail | null> {
  const url = new URL(`/countries/${encodeURIComponent(code)}`, process.env.API_URL);
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Country request failed: ${res.status}`);
  return res.json() as Promise<CountryDetail>;
}
