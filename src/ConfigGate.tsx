import React, { useCallback, useEffect, useRef, useState } from "react";
import { fetchConfig } from "./config/config";

const BASE_DELAY_MS = 5000;
const MAX_DELAY_MS = 60000;

// Renders children only once the real config has loaded. Until then shows a
// retry message and keeps retrying (5 s doubling to 60 s, with jitter).
export default function ConfigGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attempts = useRef(0);
  const running = useRef(false);
  const alive = useRef(true);

  const attempt = useCallback(async () => {
    if (running.current || !alive.current) return;
    running.current = true;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setBusy(true);
    let ok = false;
    try {
      ok = await fetchConfig();
    } catch {
      ok = false;
    }
    running.current = false;
    if (!alive.current) return;
    setBusy(false);
    if (ok) {
      setLoaded(true);
      return;
    }
    const base = Math.min(BASE_DELAY_MS * 2 ** attempts.current, MAX_DELAY_MS);
    attempts.current += 1;
    const delay = Math.min(base * (1 + Math.random() * 0.2), MAX_DELAY_MS);
    timer.current = setTimeout(attempt, delay);
  }, []);

  useEffect(() => {
    alive.current = true;
    attempt();
    return () => {
      alive.current = false;
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
    };
  }, [attempt]);

  if (loaded) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <p className="text-3xl font-semibold">
        Couldn't load the Design Day schedule. Retrying…
      </p>
      <p className="text-3xl font-semibold">
        Impossible de charger l'horaire du Jour du design. Nouvelle tentative…
      </p>
      <button
        type="button"
        onClick={attempt}
        disabled={busy}
        className="rounded bg-black px-6 py-3 text-xl text-white disabled:opacity-50"
      >
        Retry now / Réessayer maintenant
      </button>
    </div>
  );
}
