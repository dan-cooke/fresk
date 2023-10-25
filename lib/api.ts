import { Cassette } from "@/app/types";

const { API_KEY, API_URL } = process.env;

if (!API_KEY) {
  throw new Error("No API_KEY jound in environment");
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

export const getAllCassettes = async (
  filters?: GetAllCassettesFilters,
): Promise<Cassette[]> => {
  const t = Date.now();
  // This is the root endpoint of the api
  const data = await baseFetch<GetAllCassettesResponse>("/");

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

  // sort by brand name
  return filterCassettes(
    cassettes.sort((a, b) => a.brand?.localeCompare(b.brand)).slice(0, 20),
    filters,
  );
};

const filterCassettes = (
  cassettes: Cassette[],
  filters?: GetAllCassettesFilters,
) => {
  if (!filters) {
    return cassettes;
  }

  return cassettes.filter((cassette) => {
    return Object.entries(filters).every(([key, value]) => {
      return cassette[key as keyof Cassette] === value;
    });
  });
};
