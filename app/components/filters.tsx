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
    url.searchParams.set(key, value);

    push(url.toString());
  };
  return (
    <div className="flex mt-8 gap-8">
      <Select
        options={availableFilters.brands}
        label="Brand"
        defaultValue={searchParams?.brand}
        onChange={(brand) => handleFilter("brand", brand)}
      />
      <Select
        options={availableFilters.colors}
        label="Color"
        defaultValue={searchParams?.color}
        onChange={(color) => handleFilter("color", color)}
      />
      <Select
        options={availableFilters.types}
        label="Type"
        defaultValue={searchParams?.type}
        onChange={(type) => handleFilter("type", type)}
      />
    </div>
  );
}
