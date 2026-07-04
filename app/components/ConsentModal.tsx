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
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Saidia Swahiba Kuwa Bora
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Tunaomba ruhusa ya kuhifadhi mazungumzo yako ili kuboresha msaidizi wetu wa AI.
          Hii inatusaidia kufanya Swahiba azungumze Kiswahili na KiswaEnglish asilia zaidi.
          <br /><br />
          <span className="text-sm italic">
            (We request permission to log your conversations to improve our AI. This helps us make Swahiba speak more natural Swahili and KiswaEnglish.)
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleConsent(true)}
            className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors"
          >
            Kubali (Accept)
          </button>
          <button
            onClick={() => handleConsent(false)}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Kataa (Decline)
          </button>
        </div>
        <p className="mt-4 text-xs text-gray-400 text-center">
          Unaweza kubadilisha uamuzi wako wakati wowote kwenye mipangilio.
        </p>
      </div>
    </div>
  );
}
