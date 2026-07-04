"use client";

import { useState, useEffect } from "react";
import { useChatStore } from "../store/chatStore";

export default function ConsentModal() {
  const [showModal, setShowModal] = useState(false);
  const { consented, setConsent } = useChatStore();

  useEffect(() => {
    if (consented === null) {
      setShowModal(true);
    }
  }, [consented]);

  const handleConsent = (choice: boolean) => {
    setConsent(choice);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm
                 transition-opacity duration-300 ease-out"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-7 shadow-2xl
                   transform transition-all duration-300 ease-out"
      >
        {/* Heading */}
        <h2 
          id="consent-title"
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center"
        >
          Saidia Swahiba Kuwa Bora
        </h2>

        {/* Description */}
        <div className="text-gray-700 mb-6 space-y-3 leading-relaxed">
          <p>
            Tunaomba ruhusa ya kuhifadhi mazungumzo yako ili kuboresha msaidizi wetu wa AI.
            Hii inatusaidia kufanya Swahiba azungumze Kiswahili, Kiingerezana Kiswaenglish asilia zaidi.
          </p>
          <p className="text-sm text-gray-500 border-l-2 border-gray-200 pl-3">
            We request permission to log your conversations to improve our AI. This helps us make Swahiba speak more natural Swahili, English and Kiswaenglish.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleConsent(true)}
            className="flex-1 bg-gray-900 text-white py-3.5 px-4 rounded-xl font-semibold
                       hover:bg-gray-800 active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-900/30"
          >
            Kubali (Accept)
          </button>
          <button
            onClick={() => handleConsent(false)}
            className="flex-1 bg-gray-100 text-gray-700 py-3.5 px-4 rounded-xl font-semibold
                       hover:bg-gray-200 active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-400/30"
          >
            Kataa (Decline)
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-5 text-xs text-gray-400 text-center">
          Unaweza kubadilisha uamuzi wako wakati wowote kwenye mipangilio.
        </p>
      </div>
    </div>
  );
}