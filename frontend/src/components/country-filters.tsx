"use client";

import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function CountryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("name") ?? "");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if ((searchParams.get("name") ?? "") === debouncedSearch) return;

    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) params.set("name", debouncedSearch);
    else params.delete("name");

    router.replace(`${pathname}?${params}`, { scroll: false });
  }, [debouncedSearch, pathname, router, searchParams]);

  const handleRegionChange = (region: string) => {
    const params = new URLSearchParams(searchParams);
    if (region) params.set("region", region);
    else params.delete("region");

    router.replace(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <div className="mb-8 flex flex-col gap-10 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:max-w-120">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Select
        value={searchParams.get("region") ?? ""}
        onChange={handleRegionChange}
      />
    </div>
  );
}
