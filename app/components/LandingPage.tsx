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
    <div className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-gray-200">
      <Navbar onTrySwahiba={onStartChatting} />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gray-200/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gray-100 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-600">Built from scratch for East Africa</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Akili Unde Ya <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-400">
              Kiswahili & KiswaEnglish
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience natural conversation that understands your culture.
            Swahiba blends Kiswahili and English just like you do in your daily life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartChatting}
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-gray-200"
            >
              Ongea na Swahiba
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <a
              href="#research"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Read Research
            </a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Most global language models struggle with the nuances of local languages and the natural code-switching
                common in East Africa. Our mission is to build AI that truly represents local language use, culture, and context.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We believe in democratizing AI by creating efficient systems that run on standard consumer hardware,
                making advanced technology accessible to students and developers across the region.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col gap-4">
                <GlobeAltIcon className="w-10 h-10 text-gray-900" />
                <h3 className="font-bold text-lg">Localized</h3>
                <p className="text-sm text-gray-500">Reflecting East African speech patterns.</p>
              </div>
              <div className="p-8 bg-gray-900 text-white rounded-3xl flex flex-col gap-4 transform translate-y-8">
                <SparklesIcon className="w-10 h-10 text-white" />
                <h3 className="font-bold text-lg">Authentic</h3>
                <p className="text-sm text-gray-300">Blends Swahili and English naturally.</p>
              </div>
              <div className="p-8 bg-gray-100 rounded-3xl flex flex-col gap-4">
                <CpuChipIcon className="w-10 h-10 text-gray-900" />
                <h3 className="font-bold text-lg">Efficient</h3>
                <p className="text-sm text-gray-500">Optimized for consumer hardware.</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col gap-4 transform translate-y-8">
                <BeakerIcon className="w-10 h-10 text-gray-900" />
                <h3 className="font-bold text-lg">Original</h3>
                <p className="text-sm text-gray-500">Built without pre-trained weights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Why Swahiba?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🇹🇿</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Kiswaenglish Support</h3>
              <p className="text-gray-500 leading-relaxed">
                Finally, an AI that understands when you say "Niko kwa meeting, nitakupigia later."
              </p>
            </div>
            <div className="p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold mb-4">From Scratch</h3>
              <p className="text-gray-500 leading-relaxed">
                Not a fine-tune of a global model. This was built from the ground up using custom Swahili corpora.
              </p>
            </div>
            <div className="p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Accessible AI</h3>
              <p className="text-gray-500 leading-relaxed">
                Optimized for standard hardware, proving you don't need a supercomputer to build meaningful AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 px-6 bg-gray-900 text-white rounded-[48px] mx-6 my-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-white/5 skew-x-12 transform translate-x-1/2" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Technical Foundation</h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Our architecture follows the Transformer design introduced in the foundational paper:
            <span className="italic block mt-4 text-white">"Attention Is All You Need"</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
              <h4 className="font-bold text-lg mb-2">MLX Optimization</h4>
              <p className="text-sm text-gray-400">Specifically built for Silicon macOS using MLX for extreme efficiency and performance.</p>
            </div>
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
              <h4 className="font-bold text-lg mb-2">Custom Corpora</h4>
              <p className="text-sm text-gray-400">Trained on a mix of synthetic data and public Swahili datasets to capture local idioms.</p>
            </div>
          </div>
          <div className="mt-12">
             <a
              href="https://github.com/zuck30/swahili-llm-scratch"
              target="_blank"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              View Model Repository on GitHub
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Inspired by the Best</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            This work is inspired by the approach and teachings of Andrej Karpathy and Alec Radford,
            whose work has shown what is possible when building language models from first principles.
          </p>
          <button
            onClick={onStartChatting}
            className="px-12 py-5 bg-gray-900 text-white rounded-3xl font-bold text-xl hover:bg-black transition-all hover:scale-[1.05] active:scale-[0.95] shadow-2xl shadow-gray-200"
          >
            Start Chatting Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
