export interface Country {
  alpha3Code: string;
  name: string;
  capital: string | null;
  region: string;
  population: number;
  flags: Flags;
}

export interface BorderCountry {
  code: string;
  name: string;
}

export interface CountryDetail {
  alpha3Code: string;
  name: string;
  nativeName: string;
  capital: string | null;
  region: string;
  subregion: string | null;
  population: number;
  flags: Flags;
  topLevelDomain: string[];
  currencies: string[];
  languages: string[];
  borders: BorderCountry[];
}

export interface Flags {
  svg: string;
  png: string;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
