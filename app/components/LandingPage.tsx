"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface LandingPageProps {
  onStartChatting: () => void;
}

export default function LandingPage({ onStartChatting }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-200">
      <Navbar onTrySwahiba={onStartChatting} />

      {/* Hero Section */}
      <section id="home" className="relative pt-44 pb-20 px-8 overflow-hidden">
        {/* Organic background blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
          <div className="absolute top-10 -left-20 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[100px] opacity-60" />
          <div className="absolute top-40 -right-20 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-[clamp(3rem,6vw,4.5rem)] font-medium tracking-tight mb-8 leading-[1.1]">
            AI that speaks your language
            <br />
            <span className="text-gray-900">Kiswahili & Kiswa-english</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Swahiba understands how people actually communicate in East Africa. It mixes languages naturally just like you do every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onStartChatting}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-base font-medium transition-colors"
            >
              Start Chatting
            </button>
            <a
              href="#about"
              className="bg-white border border-gray-200 hover:border-gray-300 text-gray-900 px-8 py-4 rounded-full text-base font-medium transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Media Image Section */}
      <section className="px-8 pb-24 relative z-10">
        <div className="max-w-5xl mx-auto relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-gray-100 border border-gray-100">
          <Image
            src="/assets/chat.png"
            alt="Swahiba Chat Interface"
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-[clamp(3rem,6vw,4.5rem)] font-medium tracking-tight mb-8 leading-[1.1]">What We're Aiming For</h2>
          <div className="max-w-3xl mx-auto mb-16 text-left md:text-center space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              Most global language models struggle with the nuances of local languages and the natural code-switching common in East Africa. Our mission is to build AI that truly represents local language use, culture, and context.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe in democratizing AI by creating efficient systems that run on standard consumer hardware, making advanced technology accessible to students and developers across the region.
            </p>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-gray-50 border border-gray-100">
            <Image
              src="/assets/mission.png"
              alt="Our Mission Overview"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
      {/* Why Swahiba Section */}
      <section id="why" className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-[clamp(3rem,6vw,4.5rem)] font-medium tracking-tight mb-8 leading-[1.1]">Building Something Special</h1>
          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-gray-50 border border-gray-100">
            <Image
              src="/assets/why.png"
              alt="Why Swahiba Features"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-medium tracking-tight mb-8">Inspired by the Best</h2>
          <p className="text-gray-600 text-xl leading-relaxed mb-10">
            This work is inspired by the approach and teachings of Andrej Karpathy and Alec Radford, whose work has shown what is possible when building language models from first principles. And We love Training Deep Neural Networks On Huge Datasets.
          </p>
          <a
            href="https://github.com/zuck30/SWAHIBA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            View Source Code
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-medium tracking-tight mb-6">Ready to try it?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto">Start a conversation and see how Swahiba understands your language and style.</p>
          <button
            onClick={onStartChatting}
            className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-5 rounded-full text-lg font-medium transition-colors shadow-xl shadow-gray-200"
          >
            Start Chatting Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}