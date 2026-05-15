"use server";

import { getCountries } from "@/lib/api/countries";

export async function loadMoreCountries(params: {
  name?: string;
  region?: string;
  page: number;
}) {
  return getCountries(params);
}
