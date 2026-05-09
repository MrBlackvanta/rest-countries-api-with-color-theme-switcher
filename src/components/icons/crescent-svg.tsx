export default function CrescentSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={16}
      fill="none"
      viewBox="0 0 17 16"
      {...props}
    >
      <path
        className="fill-transparent dark:fill-white"
        fillRule="evenodd"
        stroke="#111517"
        strokeWidth={1.25}
        d="M11.678 11.23c-3.884 0-7.034-2.888-7.034-6.447 0-1.343.448-2.587 1.212-3.618C2.816 2.11.625 4.745.625 7.853c0 3.9 3.45 7.062 7.704 7.062 3.389 0 6.266-2.007 7.296-4.796a7.458 7.458 0 0 1-3.947 1.11Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
