import { getAllCassettes } from "@/lib/api";
import { CassetteCard } from "./components/cassette-card";
import clsx from "clsx";

export default async function Home() {
  const cassetes = await getAllCassettes();
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
