import Link from "next/link";
import { Button } from "./button";

export type TagProps = {
  children: string;
  hrefBaseSlug?: string;
};
export function Tag({ children, hrefBaseSlug = "posts" }: TagProps) {
  return (
    <Button>
      <Link href={`/${hrefBaseSlug}?tag=${children}`}>{children}</Link>
    </Button>
  );
}
