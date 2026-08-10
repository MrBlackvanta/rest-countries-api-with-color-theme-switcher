import { CountryBrowser } from "@/components/country-browser";
import { getCountries } from "@/lib/api/countries";

interface HomeProps {
  searchParams: Promise<{
    name?: string;
    region?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { name = "", region = "" } = await searchParams;
  const countries = await getCountries({ name, region });

  return (
    <main className="mx-auto w-full max-w-7xl grow px-4 pb-20">
      <CountryBrowser countries={countries} applied={{ name, region }} />
    </main>
  );
}
