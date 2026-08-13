import { CountryBrowser } from "@/components/country-browser";
import { getCountries } from "@/lib/api/countries";
import { canonicalRegion } from "@/lib/regions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

interface HomeProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const name = firstValue(params.name).trim();
  const region = canonicalRegion(firstValue(params.region));
  const countries = await getCountries({ name, region });

  return (
    <div className="pb-20">
      <CountryBrowser countries={countries} applied={{ name, region }} />
    </div>
  );
}
