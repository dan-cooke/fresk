import { Button } from "./button";

export type TagProps = {
  children: string;
  hrefBaseSlug?: string;
};
export function Tag({ children }: TagProps) {
  return <Button>{children}</Button>;
}
