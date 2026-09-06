import { SearchSvg } from "@/components/icons/search-svg";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="dark:bg-dark-blue shadow-input relative block h-12 cursor-pointer rounded-md bg-white text-xs leading-5 sm:h-14 sm:text-sm">
      <SearchSvg
        aria-hidden="true"
        className="absolute inset-s-8 top-1/2 -translate-y-1/2"
      />
      <input
        type="search"
        aria-label="Search for a country"
        placeholder="Search for a country..."
        className="v-field-focus placeholder:text-dark-gray size-full cursor-pointer rounded-md ps-18.5 pe-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent dark:placeholder:text-white"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
