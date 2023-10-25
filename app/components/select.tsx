"use client";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { IoCheckmark, IoClose, IoExit } from "react-icons/io5";

export function Select({
  options,
  defaultValue,
  onChange,
  label,
  onClear,
}: {
  options: any[];
  defaultValue?: string;
  onChange?: (option: any) => void;
  onClear?: () => void;
  label?: string;
}) {
  return (
    <div
      className={clsx(
        "text-text-secondary-light",
        "dark:text-text-secondary-dark",
        "text-sm",
      )}
    >
      <label>{label}</label>
      <Listbox
        name="option"
        as="div"
        value={defaultValue}
        className="relative"
        onChange={onChange}
      >
        <Listbox.Button
          className={clsx(
            "bg-neutral-1-light dark:bg-neutral-1-dark relative",
            "p-2 px-4 w-32",
            "flex place-items-center place-content-between gap-3",
            "rounded-lg",
            "aria-expanded:rounded-b-none",
          )}
        >
          {defaultValue || "All"}
        </Listbox.Button>
        {defaultValue ? (
          <button
            className={clsx("absolute  top-1/2 -translate-y-1/2", "right-4")}
            onClick={onClear}
          >
            <IoClose />
          </button>
        ) : null}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={clsx(
              "absolute top-7 left-0",
              "z-10",
              "max-h-96",
              "overflow-y-scroll",
            )}
          >
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={clsx(
                  "bg-neutral-1-light dark:bg-neutral-1-dark",
                  "w-32",
                  "last-of-type:rounded-b-lg",
                )}
              >
                {({ selected }) => (
                  <div
                    className={clsx(
                      "",
                      selected
                        ? "bg-neutral-2-light dark:bg-neutral-2-dark"
                        : "",
                      "cursor-pointer hover:bg-neutral-2-light dark:hover:bg-neutral-2-dark",
                    )}
                  >
                    <div className="p-2 px-4 flex gap-3 place-items-center place-content-between">
                      {option}
                      {selected ? <IoCheckmark /> : null}
                    </div>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
