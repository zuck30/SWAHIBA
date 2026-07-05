"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";
import { ArrowRightIcon, BeakerIcon, GlobeAltIcon, SparklesIcon, CpuChipIcon } from "@heroicons/react/24/outline";

interface LandingPageProps {
  onStartChatting: () => void;
}

export default function LandingPage({ onStartChatting }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <Navbar onTrySwahiba={onStartChatting} />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-24 md:pt-48 md:pb-40 px-6 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1000px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-surface border border-google-border mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-google-blue"></span>
            </span>
            <span className="text-xs font-medium text-google-gray">Built from scratch for East Africa</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-[72px] font-normal tracking-tight mb-8 leading-[1.1] text-gray-900">
            Akili Unde Ya <br className="hidden md:block" />
            <span className="text-google-blue">Kiswahili & KiswaEnglish</span>
          </h1>

          <p className="text-lg md:text-[22px] text-google-gray max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Experience natural conversation that understands your culture.
            Swahiba blends Kiswahili and English just like you do in your daily life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartChatting}
              className="bg-google-blue text-white px-8 py-3.5 rounded-[4px] text-base font-medium hover:bg-[#1557b0] transition-colors shadow-sm flex items-center gap-2"
            >
              Ongea na swahiba
              <ArrowRightIcon className="w-4 h-4" />
            </button>
            <a
              href="#research"
              className="text-google-blue hover:bg-blue-50 px-8 py-3.5 rounded-[4px] text-base font-medium transition-colors"
            >
              Read Research
            </a>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 border-t border-google-border bg-google-surface">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center text-google-blue">
                <GlobeAltIcon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-normal text-gray-900">Kiswaenglish</h3>
              <p className="text-google-gray leading-relaxed text-[15px]">
                Built specifically for code-switching patterns where Kiswahili
                and English are naturally blended in daily conversation.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center text-google-blue">
                <CpuChipIcon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-normal text-gray-900">Efficient Architecture</h3>
              <p className="text-google-gray leading-relaxed text-[15px]">
                Optimized for standard consumer hardware, following the
                Transformer design from the ground up without pre-trained weights.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center text-google-blue">
                <BeakerIcon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-normal text-gray-900">Research Led</h3>
              <p className="text-google-gray leading-relaxed text-[15px]">
                Inspired by first-principles approaches to AI development,
                designed for local context, culture, and accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-google-blue font-medium text-sm tracking-wider uppercase mb-4 block">Our Mission</span>
              <h2 className="text-3xl md:text-5xl font-normal mb-8 leading-tight">
                Democratizing AI for <br />
                the East African community.
              </h2>
              <p className="text-google-gray text-lg leading-relaxed mb-8">
                Unlike global models, Swahiba was developed to reflect local language use and culture.
                Our goal is to make advanced language technology accessible to students,
                developers, and researchers without specialized infrastructure.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-normal text-gray-900">0.1</span>
                  <span className="text-sm text-google-gray">Alpha Version</span>
                </div>
                <div className="w-px h-12 bg-google-border" />
                <div className="flex flex-col">
                  <span className="text-3xl font-normal text-gray-900">100%</span>
                  <span className="text-sm text-google-gray">From Scratch</span>
                </div>
              </div>
            </div>
            <div className="relative bg-google-surface rounded-[32px] border border-google-border p-8 md:p-12">
               <div className="prose prose-blue max-w-none">
                  <h4 className="text-xl font-medium mb-4">First Principles</h4>
                  <p className="text-google-gray">
                    This work is inspired by the approach, teaching, and open contributions of Andrej Karpathy and Alec Radford.
                    The architecture follows the Transformer design introduced in "Attention Is All You Need."
                  </p>
                  <div className="mt-8 pt-8 border-t border-google-border flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">MLX Optimized</span>
                    <span className="text-sm font-medium text-gray-500">Silicon macOS</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Swahiba Section */}
      <section id="why" className="py-24 px-6 bg-google-surface border-y border-google-border">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal mb-16">Why Swahiba?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white rounded-2xl border border-google-border shadow-sm">
              <div className="text-2xl mb-4">🇹🇿</div>
              <h3 className="text-xl font-medium mb-4">Localized Context</h3>
              <p className="text-google-gray text-sm leading-relaxed">
                Understand the rich linguistic context of East Africa, specifically focusing on Tanzanian speech patterns.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-google-border shadow-sm">
              <div className="text-2xl mb-4">🌱</div>
              <h3 className="text-xl font-medium mb-4">Original Weights</h3>
              <p className="text-google-gray text-sm leading-relaxed">
                Developed without relying on pre-trained model weights, ensuring a truly custom baseline for Swahili.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-google-border shadow-sm">
              <div className="text-2xl mb-4">💻</div>
              <h3 className="text-xl font-medium mb-4">Hardware Friendly</h3>
              <p className="text-google-gray text-sm leading-relaxed">
                Designed to run efficiently on standard consumer hardware, lowering the barrier to entry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal mb-8">Building the Future</h2>
          <p className="text-lg text-google-gray leading-relaxed mb-12">
            Swahiba is a research project dedicated to bridging linguistic gaps in AI.
            We are a community-driven initiative welcoming contributions from developers
            and researchers across the globe.
          </p>
          <div className="flex justify-center gap-4">
             <button
              onClick={onStartChatting}
              className="bg-google-blue text-white px-8 py-3.5 rounded-[4px] text-base font-medium hover:bg-[#1557b0] transition-colors shadow-sm"
            >
              Ongea na swahiba
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
