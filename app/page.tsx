import { getAllCassettes } from "@/lib/api";
import { CassetteCard } from "./components/cassette-card";
import clsx from "clsx";
import { cache } from "react";

// We are using axios, which is not natively cached
// by Nextjs - so we have to use cache from react
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#example
const getCassettes = cache(async () => {
  return getAllCassettes();
});

export const revalidate = 3600;
export default async function Home() {
  const cassetes = await getCassettes();
  return (
    <main>
      <h1>Audio cassetes</h1>
      <div className={clsx("grid grid-cols-4 gap-4")}>
        {cassetes.map((cassette) => (
          <CassetteCard key={cassette.id} cassette={cassette} />
        ))}
      </div>
    </main>
  );
}
