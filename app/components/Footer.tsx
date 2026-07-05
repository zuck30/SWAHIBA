"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-google-surface border-t border-google-border pt-16 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-6 h-6">
                <Image
                  src="/assets/rubber-duck.png"
                  alt="Swahiba"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-medium text-gray-900">Swahiba</span>
            </Link>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-6 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://github.com/zuck30/swahili-llm-scratch" className="text-[14px] text-google-gray hover:text-google-blue transition-colors">
                  Model Architecture
                </a>
              </li>
              <li>
                <a href="https://github.com/zuck30/SWAHIBA" className="text-[14px] text-google-gray hover:text-google-blue transition-colors">
                  Open Source Code
                </a>
              </li>
              <li>
                <a href="#research" className="text-[14px] text-google-gray hover:text-google-blue transition-colors">
                  Technical Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/settings" className="text-[14px] text-google-gray hover:text-google-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-[14px] text-google-gray hover:text-google-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-[14px] text-google-gray hover:text-google-blue transition-colors">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:mwalyangashadrack@gmail.com" className="text-[14px] text-google-gray hover:text-google-blue transition-colors">
                  Email Us
                </a>
              </li>
              <li>
                <a href="https://sheddysilicon.netlify.app" className="text-[14px] text-google-gray hover:text-google-blue transition-colors">
                  Author Site
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-google-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[12px] text-google-gray">
            © {currentYear} Swahiba. Built from scratch in Tanzania.
          </p>
          <div className="flex gap-8">
             <span className="text-[12px] text-google-gray">Research Preview</span>
             <span className="text-[12px] text-google-gray">Alpha 0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
