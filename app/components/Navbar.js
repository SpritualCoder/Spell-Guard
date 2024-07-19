import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  return (
    <>
      <header className="text-gray-600 body-font border-2 dark:bg-dark">
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <span className="ml-3 text-xl dark:text-white">SpellGuard|</span>

          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center dark:text-white">
            <Link
              className="mr-5 hover:text-gray-900 hover:dark:text-gray-300"
              href="/"
            >
              Home
            </Link>
            <Link
              className="mr-5 hover:text-gray-900 hover:dark:text-gray-300"
              href="/about"
            >
              About
            </Link>
            <Link
              className="mr-5 hover:text-gray-900 hover:dark:text-gray-300"
              href="/"
            >
              Contact Us
            </Link>
          </nav>
          <div className="flex flex-1 justify-end">
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
