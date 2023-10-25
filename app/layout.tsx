import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeToggle } from "./theme/theme-toggle";
import { getTheme } from "./theme/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Freskdesk Cassettes",
  description: "A collection of cassette tapes for Freshdesk Digital",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme();

  return (
    <html lang="en" className={clsx(theme === "dark" ? "dark" : "light")}>
      <body
        className={clsx(
          inter.className,
          "bg-bg-light text-text-primary-light",
          "dark:bg-bg-dark dark:text-text-primary-dark",
          "max-w-full md:max-w-2xl lg:max-w-4xl ml-auto mr-auto print:max-w-none",
        )}
      >
        <ThemeToggle theme={theme} />
        {children}
      </body>
    </html>
  );
}
