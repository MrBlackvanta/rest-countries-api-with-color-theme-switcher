import Link from "next/link";

export default function CountryNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl grow flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <h2 className="text-2xl font-extrabold sm:text-3xl">Country not found</h2>
      <p className="text-dark-gray max-w-md text-sm sm:text-base">
        We couldn’t find a country with that code. It may have been mistyped or
        no longer exists.
      </p>
      <Link
        href="/"
        className="dark:bg-dark-blue shadow-input rounded-md bg-white px-6 py-3 text-sm font-semibold sm:text-base"
      >
        Back to all countries
      </Link>
    </main>
  );
}
