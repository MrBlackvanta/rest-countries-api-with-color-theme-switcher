import { SearchSvg } from "@/components/icons/search-svg";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="dark:bg-dark-blue shadow-input relative block h-12 cursor-pointer rounded-md bg-white ps-18.5 text-xs leading-5 sm:h-14 sm:text-sm">
      <SearchSvg
        aria-hidden="true"
        className="absolute inset-s-8 top-1/2 -translate-y-1/2"
      />
      <input
        type="search"
        aria-label="Search for a country"
        placeholder="Search for a country..."
        className="placeholder:text-dark-gray size-full cursor-pointer focus:outline-none dark:placeholder:text-white"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
