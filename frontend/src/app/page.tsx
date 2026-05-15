import { getCountries } from "@/lib/api/countries";

export default async function Home() {
  const countries = await getCountries({});

  return (
    <main className="mx-auto w-full max-w-7xl px-4">
      {/* <SearchInput value={search} onChange={handleSearch} /> */}
      <pre>{JSON.stringify(countries, null, 2)}</pre>
    </main>
  );
}
