interface SpinnerProps {
  className?: string;
}

export function Spinner({ className = "" }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={`animate-spin rounded-full border-t-transparent motion-reduce:animate-none ${className}`}
    />
  );
}
