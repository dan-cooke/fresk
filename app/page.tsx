import { getAllCassettes } from "@/lib/api";
import { CassetteCard } from "./components/cassette-card";
import clsx from "clsx";

export const revalidate = 3600;
export default async function Home() {
  const cassetes = await getAllCassettes();
  return (
    <main>
      <h1 className="font-black text-3xl xl:text-5xl">freskdesk.audio</h1>
      <h2 className="text-text-secondary-light dark:text-text-secondary-dark">
        Your one stop shop for all things audio cassettes
      </h2>
      <div className={clsx("grid grid-cols-4 gap-8 mt-16")}>
        {cassetes.map((cassette) => (
          <CassetteCard key={cassette.id} cassette={cassette} />
        ))}
      </div>
    </main>
  );
}
