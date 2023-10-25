"use client";

import { Button } from "./components/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full flex place-items-center place-content-center flex-col gap-8 h-full mt-32">
      <h2 className="text-4xl font-bold ">
        We are having trouble with our cassettes
      </h2>
      <Button onClick={() => location.reload()}>Try again</Button>
    </div>
  );
}
