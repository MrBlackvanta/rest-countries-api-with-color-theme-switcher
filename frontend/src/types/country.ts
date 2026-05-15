export interface Country {
  alpha3Code: string;
  name: string;
  capital: string | null;
  region: string;
  population: number;
  flags: Flags;
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
