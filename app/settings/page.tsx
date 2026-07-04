"use client";

import { useChatStore } from "../store/chatStore";
import { getSessionId } from "../lib/consent";
import Link from "next/link";
import {
  ArrowLeftIcon,
  UserIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ScaleIcon,
  UserGroupIcon,
  BugAntIcon,
  InformationCircleIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function SettingsPage() {
  const { consented, setConsent } = useChatStore();
  const [sessionId, setSessionId] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const toggleExpand = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const regulations = [
    {
      id: "tos",
      title: "Terms of Service",
      icon: <DocumentTextIcon className="w-5 h-5" />,
      content: "Welcome to Swahiba. By using our service, you agree to provide honest feedback and use the assistant for lawful purposes. We provide Swahiba 'as is' for research and educational use. We are not liable for any generated content that may be inaccurate or inappropriate."
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      content: "Your privacy is important to us. If you opt-in to logging, we collect your conversation history and an anonymous session ID. We strip personally identifiable information like phone numbers and emails before analysis. We do not sell your data to third parties."
    },
    {
      id: "guidelines",
      title: "Community Guidelines",
      icon: <UserGroupIcon className="w-5 h-5" />,
      content: "Be respectful to the assistant. Do not use Swahiba to generate hate speech, harassment, or illegal content. Swahiba is designed for the Tanzanian community to bridge linguistic gaps in AI."
    }
  ];

  const sections = [
    {
      title: "User Profile",
      icon: <UserIcon className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Anonymous Session ID</p>
          <code className="block p-3 bg-gray-50 rounded-lg text-xs font-mono text-gray-700 break-all">
            {sessionId}
          </code>
        </div>
      )
    },
    {
      title: "Privacy & Consent",
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      content: (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-medium text-gray-900">Logging {consented ? "Enabled" : "Disabled"}</p>
            <p className="text-sm text-gray-500">Help improve Swahiba by sharing conversation logs</p>
          </div>
          <button
            onClick={() => setConsent(!consented)}
            aria-label={`Toggle logging ${consented ? 'off' : 'on'}`}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              consented ? 'bg-gray-900' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                consented ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      )
    },
    {
      title: "Regulations",
      icon: <ScaleIcon className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          {regulations.map((reg) => (
            <div key={reg.id} className="border border-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleExpand(reg.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-gray-400">
                    {reg.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{reg.title}</span>
                </div>
                <ChevronDownIcon
                  className={clsx(
                    "w-5 h-5 text-gray-400 transition-transform duration-200",
                    expandedSection === reg.id && "rotate-180"
                  )}
                />
              </button>
              {expandedSection === reg.id && (
                <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed bg-white">
                  {reg.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Security",
      icon: <BugAntIcon className="w-6 h-6" />,
      content: (
        <Link href="mailto:sheldoncodesdaily@gmail.com" className="flex items-center justify-between p-4 border border-red-100 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
          <div>
            <p className="font-medium text-red-900">Report Vulnerability</p>
            <p className="text-sm text-red-600">Help us keep Swahiba secure</p>
          </div>
          <ArrowLeftIcon className="w-5 h-5 text-red-400 rotate-180" />
        </Link>
      )
    },
    {
      title: "About Swahiba",
      icon: <InformationCircleIcon className="w-6 h-6" />,
      content: (
        <div className="prose prose-sm text-gray-600">
          <p>
            Swahiba is a research project dedicated to building AI assistants that understand
            the rich linguistic context of East Africa. We focus on natural Kiswahili and
            KiswaEnglish code-switching as spoken in modern Tanzania.
          </p>
          <p className="text-xs mt-4">Version 0.1.0-alpha</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Go back">
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-12 pb-24">
        {sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <div className="p-2 bg-gray-50 rounded-lg">
                {section.icon}
              </div>
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>
            <div className="pl-13">
               {section.content}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
