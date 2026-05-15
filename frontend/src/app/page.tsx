import { CountryFilters } from "@/components/country-filters";
import { getCountries } from "@/lib/api/countries";
import { Suspense } from "react";

interface HomeProps {
  searchParams: Promise<{
    name?: string;
    region?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { name, region } = await searchParams;
  const countries = await getCountries({ name, region });

  return (
    <main className="mx-auto w-full max-w-7xl px-4">
      <Suspense>
        <CountryFilters />
      </Suspense>
      <pre>{JSON.stringify(countries, null, 2)}</pre>
    </main>
  );
}
