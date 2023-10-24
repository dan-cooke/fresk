"use server";
import { cookies, headers } from "next/headers";
import { Theme } from "./theme-toggle";

export async function getTheme() {
  // This action will return the users theme prefernces
  // it will first check if they have a cookie stored with
  // theme preferences, if not it will check if
  // a system theme is set.
  const preferredTheme = cookies().get("theme")?.value;

  if (preferredTheme && preferredTheme !== "system") {
    return preferredTheme as Theme;
  }

  const headersList = headers();
  const systemTheme = headersList.get("sec-ch-prefers-color-scheme");

  if (!preferredTheme || (preferredTheme === "system" && systemTheme)) {
    return systemTheme as Theme;
  }

  return Theme.Light;
}

export async function setTheme(theme: Theme) {
  cookies().set("theme", theme);
  return null;
}
