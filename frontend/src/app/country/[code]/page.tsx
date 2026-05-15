import { BackButton } from "@/components/back-button";
import { getCountryByCode } from "@/lib/api/countries";
import { numberFormatter } from "@/lib/format";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CountryPageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { code } = await params;
  const country = await getCountryByCode(code);

  if (!country) {
    return { title: "Country not found" };
  }

  return {
    title: `${country.name} | Where in the world?`,
    description: `Population, region, languages, currencies and bordering countries of ${country.name}.`,
  };
}

function FactList({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="space-y-2 text-sm sm:text-base">
      {facts.map((fact) => (
        <div key={fact.label} className="flex gap-x-1.5">
          <dt className="font-semibold">{fact.label}:</dt>
          <dd className="font-light">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const orDash = (value: string) => value || "—";

export default async function CountryPage({ params }: CountryPageProps) {
  const { code } = await params;
  const country = await getCountryByCode(code);

  if (!country) {
    notFound();
  }

  const primaryFacts = [
    { label: "Native Name", value: orDash(country.nativeName) },
    { label: "Population", value: numberFormatter.format(country.population) },
    { label: "Region", value: orDash(country.region) },
    { label: "Sub Region", value: orDash(country.subregion ?? "") },
    { label: "Capital", value: orDash(country.capital ?? "") },
  ];

  const secondaryFacts = [
    {
      label: "Top Level Domain",
      value: orDash(country.topLevelDomain.join(", ")),
    },
    { label: "Currencies", value: orDash(country.currencies.join(", ")) },
    { label: "Languages", value: orDash(country.languages.join(", ")) },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl grow px-4 pb-20">
      <BackButton />

      <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-2 lg:items-center lg:gap-28">
        <div className="relative aspect-7/5 w-full overflow-hidden rounded-lg">
          <Image
            src={country.flags.svg}
            alt={`Flag of ${country.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            {country.name}
          </h2>

          <div className="mt-6 grid gap-y-8 sm:mt-8 sm:grid-cols-2 sm:gap-x-8">
            <FactList facts={primaryFacts} />
            <FactList facts={secondaryFacts} />
          </div>

          {country.borders.length > 0 && (
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-x-3.5">
              <h3 className="shrink-0 text-base font-semibold sm:text-lg">
                Border Countries:
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {country.borders.map((border) => (
                  <li key={border.code}>
                    <Link
                      href={`/country/${border.code}`}
                      className="dark:bg-dark-blue shadow-card inline-block rounded-sm bg-white px-6 py-1.5 text-xs font-light sm:text-sm"
                    >
                      {border.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
