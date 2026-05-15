import { getCountries } from "@/lib/api/countries";

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
      {/* <SearchInput value={search} onChange={handleSearch} /> */}
      <pre>{JSON.stringify(countries, null, 2)}</pre>
    </main>
  );
}
