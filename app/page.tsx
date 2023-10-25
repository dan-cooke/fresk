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
      <h1 className="font-black text-3xl xl:text-5xl">freskdesk.audio</h1>
      <h2 className="text-text-secondary-light dark:text-text-secondary-dark">
        Your one stop shop for all things audio cassettes
      </h2>
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
