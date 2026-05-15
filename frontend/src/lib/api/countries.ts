import { Country, PagedResult } from "@/types/country";

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

export async function getCountryByCode(code: string) {
  const url = new URL(`/countries/${code}`, process.env.API_URL);
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Country request failed: ${res.status}`);
  return res.json() as Promise<Country>;
}
