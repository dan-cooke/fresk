import clsx from "clsx";

export type ButtonProps = JSX.IntrinsicElements["button"];

export function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={clsx(
        "bg-neutral-1-light dark:bg-neutral-1-dark",
        "text-text-secondary-light dark:text-text-secondary-dark",
        "px-4 py-1 rounded-md",
        "hover:bg-neutral-2-light dark:hover:bg-neutral-2-dark",
        className,
      )}
    >
      {children}
    </button>
  );
}
