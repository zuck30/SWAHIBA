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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Research", href: "#research" },
    { name: "Mission", href: "#mission" },
    { name: "Why Swahiba", href: "#why" },
    { name: "About Us", href: "#about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-google-border py-2 shadow-sm"
          : "bg-white py-4"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
            <Image
              src="/assets/rubber-duck.png"
              alt="Swahiba"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-medium tracking-tight text-gray-900">Swahiba</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[14px] font-normal text-google-gray hover:text-google-blue transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onTrySwahiba}
            className="bg-google-blue text-white px-6 py-2 rounded-[4px] text-sm font-medium hover:bg-[#1557b0] transition-colors shadow-sm"
          >
            Ongea na swahiba
          </button>
        </div>
      </div>
    </nav>
  );
}
