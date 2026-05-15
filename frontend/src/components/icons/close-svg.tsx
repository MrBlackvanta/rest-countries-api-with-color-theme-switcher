export function CloseSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={10}
      fill="none"
      viewBox="0 0 10 10"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        d="m1 1 8 8M9 1 1 9"
      />
    </svg>
  );
}
