import { Cassette } from "@/app/types";
import { GetAllCassettesFilters } from "./api";

export type FilterOptions = {
  brands: string[];
  colors: string[];
  playingTimes: string[];
  types: string[];
};

export const getFilterOptions = (cassettes: Cassette[]): FilterOptions => {
  const filterSets = {
    brands: new Set<string>(),
    colors: new Set<string>(),
    playingTimes: new Set<string>(),
    types: new Set<string>(),
  };

  cassettes.forEach((cassette) => {
    if (cassette.brand) {
      filterSets.brands.add(cassette.brand);
    }
    if (cassette.color) {
      filterSets.colors.add(cassette.color);
    }
    if (cassette.playingTime) {
      filterSets.playingTimes.add(cassette.playingTime);
    }
    if (cassette.type) {
      filterSets.types.add(cassette.type);
    }
  });

  return {
    brands: Array.from(filterSets.brands).sort((a, b) => a.localeCompare(b)),

    colors: Array.from(filterSets.colors).sort((a, b) => a.localeCompare(b)),
    playingTimes: Array.from(filterSets.playingTimes).sort((a, b) =>
      a.localeCompare(b),
    ),

    types: Array.from(filterSets.types).sort((a, b) => a.localeCompare(b)),
  };
};

export const filterCassettes = (
  cassettes: Cassette[],
  filters?: GetAllCassettesFilters,
) => {
  if (!filters) {
    return cassettes;
  }
  return cassettes.filter((cassette) => {
    if (filters.brand && cassette.brand !== filters.brand) {
      return false;
    }
    if (filters.color && cassette.color !== filters.color) {
      return false;
    }
    if (filters.playingTime && cassette.playingTime !== filters.playingTime) {
      return false;
    }
    if (filters.type && cassette.type !== filters.type) {
      return false;
    }
    return true;
  });
};
