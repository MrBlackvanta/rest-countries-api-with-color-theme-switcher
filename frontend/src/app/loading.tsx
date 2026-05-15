export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[40vh] w-full max-w-7xl items-center justify-center px-4">
      <div role="status" className="flex flex-col items-center gap-4">
        <span
          aria-hidden="true"
          className="border-dark-gray size-10 animate-spin rounded-full border-4 border-t-transparent"
        />
        <p className="text-dark-gray text-sm font-semibold">
          Loading countries…
        </p>
      </div>
    </main>
  );
}
