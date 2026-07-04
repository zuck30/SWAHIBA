const CONSENT_KEY = "swahiba_consent";
const SESSION_ID_KEY = "swahiba_session_id";

export function getConsent(): boolean | null {
  if (typeof window === "undefined") return null;
  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === null) return null;
  return consent === "true";
}

export function setConsent(consented: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, consented.toString());
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}
