"use client";

import { SearchInput } from "@/components/ui/search-input";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4">
      <SearchInput value={search} onChange={handleSearch} />
    </main>
  );
}
