import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-7xl grow items-center justify-center px-4">
      <div role="status" className="flex flex-col items-center gap-4">
        <Spinner className="text-dark-gray size-10 border-4" />
        <p className="text-dark-gray text-sm font-semibold">
          Loading countries…
        </p>
      </div>
    </main>
  );
}
