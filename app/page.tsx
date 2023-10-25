import {
  GetAllCassettesFilters,
  GetAllCassettesPage,
  getAllCassettes,
} from "@/lib/api";
import { CassetteCard } from "./components/cassette-card";
import clsx from "clsx";
import { Filters } from "./components/filters";

type HomeProps = {
  searchParams?: GetAllCassettesFilters & GetAllCassettesPage;
};
export default async function Home({ searchParams }: HomeProps) {
  const { cassettes, totalResults, availableFilters } = await getAllCassettes({
    filters: {
      brand: searchParams?.brand,
      type: searchParams?.type,
      color: searchParams?.color,
      playingTime: searchParams?.playingTime,
    },
    pagination: {
      page: searchParams?.page,
      pageSize: searchParams?.pageSize,
    },
  });

  return (
    <main>
      <Filters
        availableFilters={availableFilters}
        searchParams={searchParams}
      />
      <div className={clsx("grid grid-cols-4 gap-8 mt-8")}>
        {cassettes.map((cassette) => (
          <CassetteCard key={cassette.id} cassette={cassette} />
        ))}
      </div>
    </main>
  );
}
