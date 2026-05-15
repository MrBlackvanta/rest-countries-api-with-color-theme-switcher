"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <h2 className="text-2xl font-extrabold sm:text-3xl">
        Something went wrong
      </h2>
      <p className="text-dark-gray max-w-md text-sm sm:text-base">
        We couldn’t load the countries right now. Check your connection and try
        again.
      </p>
      <button
        onClick={reset}
        className="dark:bg-dark-blue shadow-input cursor-pointer rounded-md bg-white px-6 py-3 text-sm font-semibold sm:text-base"
      >
        Try again
      </button>
    </main>
  );
}
