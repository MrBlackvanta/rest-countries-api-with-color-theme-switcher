"use client";

import { CountryCard } from "@/components/country-card";
import { loadMoreCountries } from "@/lib/actions/countries";
import type { Country, PagedResult } from "@/types/country";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

interface CountryGridProps {
  initial: PagedResult<Country>;
  name?: string;
  region?: string;
}

export function CountryGrid({ initial, name, region }: CountryGridProps) {
  const [items, setItems] = useState(initial.items);
  const [page, setPage] = useState(initial.page);
  const [totalPages, setTotalPages] = useState(initial.totalPages);
  const [failed, setFailed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const hasMore = page < totalPages;

  const loadMore = useCallback(() => {
    if (loadingRef.current || page >= totalPages) return;
    loadingRef.current = true;
    setFailed(false);

    startTransition(async () => {
      try {
        const next = await loadMoreCountries({ name, region, page: page + 1 });
        setItems((prev) => [...prev, ...next.items]);
        setPage(next.page);
        setTotalPages(next.totalPages);
      } catch {
        setFailed(true);
      } finally {
        loadingRef.current = false;
      }
    });
  }, [name, region, page, totalPages]);

  useEffect(() => {
    if (!hasMore || failed) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "600px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, failed, loadMore]);

  if (initial.total === 0) {
    return (
      <p className="text-dark-gray py-20 text-center text-sm font-semibold">
        No countries found
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((country, index) => (
          <li key={country.alpha3Code}>
            <CountryCard country={country} priority={index === 0} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="py-12">
          <div ref={sentinelRef} aria-hidden="true" />

          {failed ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-dark-gray text-sm">
                Couldn’t load more countries.
              </p>
              <button
                type="button"
                onClick={loadMore}
                className="dark:bg-dark-blue shadow-input rounded-md bg-white px-6 py-2 text-sm font-semibold"
              >
                Try again
              </button>
            </div>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="flex justify-center"
            >
              {isPending && (
                <>
                  <span
                    aria-hidden="true"
                    className="border-dark-gray size-8 animate-spin rounded-full border-4 border-t-transparent motion-reduce:animate-none"
                  />
                  <span className="sr-only">Loading more countries…</span>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
