import { Country, CountryDetail, PagedResult } from "@/types/country";

const MAX_PAGE_SIZE = 100;
const CACHE_SECONDS = 60 * 60;

function apiUrl(path: string) {
  const base = process.env.API_URL;
  if (!base) throw new Error("API_URL environment variable is not set");
  return new URL(path, base);
}

export async function getCountries(params: {
  name?: string;
  region?: string;
  page?: number;
  pageSize?: number;
}) {
  const url = apiUrl("/countries");

  if (params.name) url.searchParams.set("name", params.name);
  if (params.region) url.searchParams.set("region", params.region);
  if (params.page) url.searchParams.set("page", params.page.toString());
  if (params.pageSize)
    url.searchParams.set("pageSize", params.pageSize.toString());

  const res = await fetch(url, { next: { revalidate: CACHE_SECONDS } });
  if (!res.ok) throw new Error(`Countries request failed: ${res.status}`);
  return res.json() as Promise<PagedResult<Country>>;
}

export async function getAllCountries() {
  const firstPage = await getCountries({ pageSize: MAX_PAGE_SIZE });

  const remaining = await Promise.all(
    Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
      getCountries({ page: index + 2, pageSize: MAX_PAGE_SIZE }),
    ),
  );

  return [firstPage, ...remaining].flatMap((page) => page.items);
}

export async function getCountryByCode(
  code: string,
): Promise<CountryDetail | null> {
  const url = apiUrl(`/countries/${encodeURIComponent(code)}`);
  const res = await fetch(url, { next: { revalidate: CACHE_SECONDS } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Country request failed: ${res.status}`);
  return res.json() as Promise<CountryDetail>;
}
