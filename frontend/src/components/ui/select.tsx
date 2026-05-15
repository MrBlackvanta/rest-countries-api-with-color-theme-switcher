interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export function Select({ value, onChange }: SelectProps) {
  return (
    <select
      aria-label="Filter by region"
      value={value}
      onChange={onChange}
      className="dark:bg-dark-blue shadow-input h-12 w-50 cursor-pointer rounded-md bg-white px-6 text-xs leading-5 sm:text-sm"
    >
      <option value="">Filter by Region</option>
      {REGIONS.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
}
