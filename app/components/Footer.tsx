"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-200">
                <Image
                  src="/assets/rubber-duck.png"
                  alt="Swahiba Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900">Swahiba</span>
            </Link>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
              Bridging the linguistic gap with AI built from scratch for East Africa.
              Supporting Kiswahili and KiswaEnglish code-switching for natural,
              local communication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/settings" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Projects */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/zuck30/SWAHIBA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/zuck30/swahili-llm-scratch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Model Development
                </a>
              </li>
              <li>
                <a
                  href="mailto:mwalyangashadrack@gmail.com"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {currentYear} Swahiba Project. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-400">Built with 🖤 in Tanzania</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
