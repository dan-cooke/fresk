import { Cassette } from "@/app/types";
import axios from "axios";

const { API_KEY, API_URL } = process.env;

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

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

type CassetteApiData =
  | { page: string }
  | { img: string }
  | { playingTime: string }
  | { thumb: string }
  | { type: string }
  | { color: string }
  | { brand: string };

export type GetAllCassettesResponse = Record<string, CassetteApiData[]>[];

export const revalidate = 3600;

export const getAllCassettes = async (): Promise<Cassette[]> => {
  // This is the root endpoint of the api
  const { data } = await axiosClient.get<GetAllCassettesResponse>("/");

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
  return cassettes.sort((a, b) => a.brand?.localeCompare(b.brand)).slice(0, 5);
};
