import { numberFormatter } from "@/lib/format";
import { Country } from "@/types/country";
import Image from "next/image";
import Link from "next/link";

interface CountryCardProps {
  country: Country;
  priority?: boolean;
}

export function CountryCard({ country, priority = false }: CountryCardProps) {
  return (
    <article className="dark:bg-dark-blue shadow-card relative overflow-hidden rounded-md bg-white transition hover:scale-105 hover:shadow-lg">
      <div className="relative aspect-8/5">
        <Image
          src={country.flags.png}
          alt={`Flag of ${country.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 288px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="px-6 pt-6 pb-12">
        <h2 className="mb-4 text-lg font-extrabold">
          <Link
            href={`/country/${country.alpha3Code}`}
            className="rounded-xs after:absolute after:inset-0"
          >
            {country.name}
          </Link>
        </h2>

        <dl className="space-y-2 text-sm">
          <div className="flex gap-x-1">
            <dt className="font-semibold">Population:</dt>
            <dd className="font-light">
              {numberFormatter.format(country.population)}
            </dd>
          </div>
          <div className="flex gap-x-1">
            <dt className="font-semibold">Region:</dt>
            <dd className="font-light">{country.region}</dd>
          </div>
          <div className="flex gap-x-1">
            <dt className="font-semibold">Capital:</dt>
            <dd className="font-light">{country.capital ?? "—"}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
