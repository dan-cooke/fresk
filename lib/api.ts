import { Cassette } from "@/app/types";
import { FilterOptions, filterCassettes, getFilterOptions } from "./filters";

const { API_KEY, API_URL } = process.env;
console.log(process.env.API_KEY);
console.log(process.env);

if (!API_KEY) {
  throw new Error("No API_KEY found in environment");
}
if (!API_URL) {
  throw new Error("No API_URL found in environment");
}

/**
 * Fetch data from the API - just pass the endpoint you want
 * This project seems to only use a single endpoint
 * But will keep this here in case we need to extend in future
 */

export const baseFetch = async <TResponse>(
  endpoint: string,
  options: RequestInit = {},
) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as TResponse;
};

type CassetteApiData =
  | { page: string }
  | { img: string }
  | { playingTime: string }
  | { thumb: string }
  | { type: string }
  | { color: string }
  | { brand: string };

export type GetAllCassettesResponse = Record<string, CassetteApiData[]>[];

export type GetAllCassettesFilters = {
  brand?: string;
  color?: string;
  playingTime?: string;
  type?: string;
};
export type GetAllCassettesPage = {
  page?: number;
  pageSize?: number;
};
export type GetAllCassettesOptions = {
  filters?: GetAllCassettesFilters;
  pagination?: GetAllCassettesPage;
};

export const getAllCassettes = async (
  options: GetAllCassettesOptions = {},
): Promise<{
  cassettes: Cassette[];
  totalResults: number;
  availableFilters: FilterOptions;
}> => {
  const t = Date.now();
  // This is the root endpoint of the api
  const data = await baseFetch<GetAllCassettesResponse>("/");

  const page = options.pagination?.page || 0;
  const pageSize = options.pagination?.pageSize || 20;

  console.info("API call took", Date.now() - t, "ms");

  // this API returns a very strange structure, so lets map it to something more useful
  const cassettes: Cassette[] = data.map((cassette) => {
    const [id, properties] = Object.entries(cassette)[0];
    const cassetteData = properties.reduce((acc, property) => {
      return { ...acc, ...property };
    }, {} as Cassette);
    return {
      ...cassetteData,
      id,
    } as Cassette;
  });

  const filteredCassettes = filterCassettes(cassettes, options.filters);

  const sortedCassettes = filteredCassettes.sort(
    (a, b) => a.brand?.localeCompare(b.brand),
  );

  // we have to build the available filters in this function
  // its not ideal, this function is doing a lot
  // but ideally this would just all be done on the backend with
  // some kind of facetted query
  const availableFilters = getFilterOptions(filteredCassettes);

  return {
    cassettes: sortedCassettes.slice(
      page * pageSize,
      page * pageSize + pageSize,
    ),
    totalResults: cassettes.length,
    availableFilters,
  };
};
