"use client";

import { CountryFilters } from "@/components/country-filters";
import { CountryGrid } from "@/components/country-grid";
import type { Country, Filters, PagedResult } from "@/types/country";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

interface CountryBrowserProps {
  countries: PagedResult<Country>;
  applied: Filters;
}

function toHref({ name, region }: Filters) {
  const params = new URLSearchParams();
  if (name) params.set("name", name);
  if (region) params.set("region", region);

  const query = params.toString();
  return query ? `/?${query}` : "/";
}

export function CountryBrowser({ countries, applied }: CountryBrowserProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filters, mergeOptimistic] = useOptimistic(
    applied,
    (current: Filters, patch: Partial<Filters>) => ({ ...current, ...patch }),
  );

  const updateFilters = (patch: Partial<Filters>) => {
    startTransition(() => {
      mergeOptimistic(patch);
      router.replace(toHref({ ...filters, ...patch }), { scroll: false });
    });
  };

  return (
    <>
      <CountryFilters
        filters={filters}
        isPending={isPending}
        isRegionPending={isPending && filters.region !== applied.region}
        onChange={updateFilters}
      />
      <CountryGrid
        key={`${applied.name}|${applied.region}`}
        initial={countries}
        filters={applied}
        isStale={isPending}
      />
    </>
  );
}
