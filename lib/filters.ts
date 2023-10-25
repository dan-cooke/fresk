import { Cassette } from "@/app/types";
import { GetAllCassettesFilters } from "./api";

export type FilterOptions = {
  brands: string[];
  colors: string[];
  playingTimes: string[];
  types: string[];
};

export const getFilterOptions = (cassettes: Cassette[]) => {
  const filterSets = {
    brands: new Set(),
    colors: new Set(),
    playingTimes: new Set(),
    types: new Set(),
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
    brands: Array.from(filterSets.brands),
    colors: Array.from(filterSets.colors),
    playingTimes: Array.from(filterSets.playingTimes),
    types: Array.from(filterSets.types),
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
