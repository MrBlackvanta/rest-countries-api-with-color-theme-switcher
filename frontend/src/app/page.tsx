import { CountryFilters } from "@/components/country-filters";
import { CountryGrid } from "@/components/country-grid";
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
    <main className="mx-auto w-full max-w-7xl grow px-4 pb-20">
      <Suspense>
        <CountryFilters />
      </Suspense>
      <CountryGrid
        key={`${name ?? ""}|${region ?? ""}`}
        initial={countries}
        name={name}
        region={region}
      />
    </main>
  );
}
