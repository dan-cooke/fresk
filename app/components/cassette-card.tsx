import { useMemo } from "react";
import type { Cassette } from "../types";
import clsx from "clsx";

export type CassetteCardProps = {
  cassette: Cassette;
};
export function CassetteCard({ cassette }: CassetteCardProps) {
  const displayName = useMemo(() => {
    return `${cassette.brand} ${cassette.type}`;
  }, [cassette]);

  return (
    <div
      className={clsx(
        "flex flex-col",
        "bg-neutral-1-light dark:bg-neutral-2-dark",
        "drop-shadow-md",
      )}
    >
      <img
        src={cassette.img}
        alt={displayName}
        className="w-48 h-48 rounded-xl"
      />
      <h2 className="text-xl font-bold">{displayName}</h2>
      <p className="text-gray-500">{cassette.id}</p>
    </div>
  );
}
