"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggler";

export function Navbar() {
  return (
    <nav className=" flex items-center justify-between w-full  px-4 py-3 border-b border-foreground">
      {/* Left side: logo / brand */}
      <Link href="/" className="text-lg font-bold">
        Logo
      </Link>

      {/* Right side: nav links + theme toggle */}
      <div className="flex items-center space-x-4 ">
        <Link href="/" className="hover:bg-blue-500">
          Home
        </Link>
        <Link href="/" className="hover:bg-blue-500">
          About
        </Link>
        {/* Theme toggle button */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
