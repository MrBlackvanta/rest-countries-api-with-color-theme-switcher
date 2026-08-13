import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div
      role="status"
      className="flex grow flex-col items-center justify-center gap-4"
    >
      <Spinner className="text-dark-gray size-10 border-4" />
      <p className="text-dark-gray text-sm font-semibold">Loading countries…</p>
    </div>
  );
}
