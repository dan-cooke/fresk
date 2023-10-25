"use client";

import { FilterOptions } from "@/lib/filters";
import { Select } from "./select";
import { useRouter } from "next/navigation";

export type FiltersProps = {
  availableFilters: FilterOptions;
  searchParams: any;
};
export function Filters({ availableFilters, searchParams }: FiltersProps) {
  const { push } = useRouter();
  const handleFilter = (key: string, value: string) => {
    const url = new URL(window.location.href);

    if (url.searchParams.has(key)) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }

    push(url.toString());
  };

  const clearValuesForFilter = (key: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    push(url.toString());
  };

  return (
    <div className="flex mt-8 gap-8">
      <Select
        options={availableFilters.brands}
        label="Brand"
        defaultValue={searchParams?.brand}
        onChange={(brand) => handleFilter("brand", brand)}
        onClear={() => clearValuesForFilter("brand")}
      />
      <Select
        options={availableFilters.colors}
        label="Color"
        defaultValue={searchParams?.color}
        onChange={(color) => handleFilter("color", color)}
        onClear={() => clearValuesForFilter("color")}
      />
      <Select
        options={availableFilters.types}
        label="Type"
        defaultValue={searchParams?.type}
        onChange={(type) => handleFilter("type", type)}
        onClear={() => clearValuesForFilter("type")}
      />
      <Select
        options={availableFilters.playingTimes}
        label="Playing Time"
        defaultValue={searchParams?.playingTime}
        onChange={(playingTime) => handleFilter("playingTime", playingTime)}
        onClear={() => clearValuesForFilter("playingTime")}
      />
    </div>
  );
}
