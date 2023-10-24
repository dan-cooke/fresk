"use client";

import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { IoCheckmark, IoMoon, IoSettings, IoSunny } from "react-icons/io5";

import { Fragment } from "react";
import { setTheme } from "./actions";

const themeOptions = [
  { name: "Light", value: "light", icon: <IoSunny /> },
  { name: "Dark", value: "dark", icon: <IoMoon /> },
  { name: "System", value: "system", icon: <IoSettings /> },
];

export enum Theme {
  Light = "light",
  Dark = "dark",
  SystemLight = "system_light",
  SystemDark = "system_dark",
}

export type ThemeToggleProps = {
  theme: Theme;
};

const themeFromString = (value: string) => {
  switch (value) {
    case Theme.Light:
      return themeOptions[0];
    case Theme.Dark:
      return themeOptions[1];
    default:
      return themeOptions[2];
  }
};

export function ThemeToggle({ theme = Theme.Light }: ThemeToggleProps) {
  return (
    <div
      className={clsx(
        "w-full flex place-content-end mt-3 print:hidden",
        "text-text-secondary-light",
        "dark:text-text-secondary-dark",
        "text-sm",
      )}
    >
      <Listbox
        name="theme"
        as="div"
        defaultValue={theme}
        className="relative"
        onChange={(theme) => setTheme(theme as Theme)}
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
          {themeFromString(theme).name}
          <span>{themeFromString(theme).icon}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={clsx("absolute top-7 left-0", "w-full", "z-10")}
          >
            {themeOptions.map((theme) => (
              <Listbox.Option
                key={theme.value}
                value={theme.value}
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
                      {theme.name}
                      {selected ? <IoCheckmark /> : theme.icon}
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
