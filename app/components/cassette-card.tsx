import { useMemo } from "react";
import Image from "next/image";
import type { Cassette } from "../types";
import clsx from "clsx";
import { TagRow } from "./tag-row";

export type CassetteCardProps = {
  cassette: Cassette;
};
export function CassetteCard({ cassette }: CassetteCardProps) {
  const displayName = useMemo(() => {
    return `${cassette.brand} ${cassette.type || ""}`;
  }, [cassette]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 mt-16 pb-8",
        "border-b border-b-text-disabled-light",
        "dark:border-b-text-disabled-dark",
      )}
    >
      <div className="w-full h-32 rounded-t-xl relative place-self-center">
        <Image
          src={cassette.img}
          alt={displayName}
          fill
          className="rounded-xl object-contain"
        />
      </div>
      <h2 className="text-xl">{displayName}</h2>
      <TagRow tags={[cassette.color, cassette.type]} />
    </div>
  );
}
