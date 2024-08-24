import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const Nav = () => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <Link
          className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
          href="#"
          aria-label="Brand"
        >
          Ruchi
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Nav;
