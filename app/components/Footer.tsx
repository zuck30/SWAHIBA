"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  CpuChipIcon, 
  EnvelopeIcon 
} from "@heroicons/react/24/outline";

// Custom GitHub SVG since Heroicons doesn't include brand logos
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-16">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/assets/rubber-duck.png"
                alt="Swahiba Logo"
                width={30}
                height={30}
                className="object-contain"
              />
              <span className="text-xl font-medium text-gray-900 tracking-tight">Swahiba</span>
            </Link>
            <p className="text-gray-500 text-base leading-relaxed">
              AI built for East Africa. Understanding Kiswahili and Kiswa-english just as you speak it.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-6 tracking-tight">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/settings" className="group flex items-center gap-2.5 text-base text-gray-500 hover:text-gray-900 transition-colors">
                    <ShieldCheckIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="group flex items-center gap-2.5 text-base text-gray-500 hover:text-gray-900 transition-colors">
                    <DocumentTextIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    <span>Terms of Service</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900 mb-6 tracking-tight">Resources</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://github.com/zuck30/SWAHIBA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-base text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/zuck30/swahili-llm-scratch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-base text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <CpuChipIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    <span>Model Info</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:mwalyangashadrack@gmail.com"
                    className="group flex items-center gap-2.5 text-base text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <EnvelopeIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-20 pt-8 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Swahiba. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}