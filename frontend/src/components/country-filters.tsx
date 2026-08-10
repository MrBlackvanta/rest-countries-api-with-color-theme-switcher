"use client";

import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import type { Filters } from "@/types/country";
import { useEffect, useState } from "react";

interface CountryFiltersProps {
  filters: Filters;
  isPending: boolean;
  isRegionPending: boolean;
  onChange: (patch: Partial<Filters>) => void;
}

export function CountryFilters({
  filters,
  isPending,
  isRegionPending,
  onChange,
}: CountryFiltersProps) {
  const [search, setSearch] = useState(filters.name);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (filters.name === debouncedSearch) return;
    onChange({ name: debouncedSearch });
  }, [debouncedSearch, filters.name, onChange]);

  return (
    <div className="mb-8 flex flex-col gap-10 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:max-w-120">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Select
        value={filters.region}
        isPending={isRegionPending}
        onChange={(region) => onChange({ region })}
      />

      <p role="status" className="sr-only">
        {isPending ? "Loading countries…" : ""}
      </p>
    </div>
  );
}
