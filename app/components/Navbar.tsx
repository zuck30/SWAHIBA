"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  onTrySwahiba: () => void;
}

export default function Navbar({ onTrySwahiba }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Mission", href: "#mission" },
    { name: "Why Swahiba", href: "#why" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[80px] transition-all duration-300 px-8 flex items-center",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/rubber-duck.png"
            alt="Swahiba Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-xl font-medium text-gray-900 tracking-tight">Swahiba</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          onClick={onTrySwahiba}
          className="bg-gray-900 hover:bg-gray-800 text-white px-7 py-3 rounded-full text-sm font-medium transition-colors"
        >
          Try Swahiba
        </button>
      </div>
    </nav>
  );
}