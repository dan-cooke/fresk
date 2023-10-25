import { Tag } from "./tag";

export type TagRowProps = {
  tags: (string | undefined)[];
};
export function TagRow({ tags }: TagRowProps) {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      {tags?.filter((t) => !!t).map((tag) => <Tag key={tag}>{tag}</Tag>)}
    </div>
  );
}
