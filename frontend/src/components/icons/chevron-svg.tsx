export function ChevronSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={11}
      height={7}
      fill="none"
      viewBox="0 0 11 7"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m1 1 4.5 4.5L10 1"
      />
    </svg>
  );
}
