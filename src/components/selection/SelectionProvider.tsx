"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const KEY = "nazara.selection";

interface SelectionValue {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  /** False until localStorage has been read, so SSR and first paint agree. */
  ready: boolean;
}

const Ctx = createContext<SelectionValue | null>(null);

/**
 * The tray. Anonymous, persisted per browser, and never auto-opened —
 * interrupting someone to confirm what they just did is a supermarket
 * behaviour (Volume Two §04).
 *
 * localStorage can throw outright in a private window or with site data
 * blocked, so every access is guarded and the page renders correctly with no
 * stored value.
 */
export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw) as string[]);
    } catch {
      /* private window, blocked storage — an empty selection is correct */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(slugs));
    } catch {
      /* nothing to do; the tray simply will not survive a reload */
    }
  }, [slugs, ready]);

  const toggle = useCallback((slug: string) => {
    setSlugs((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));
  }, []);

  const remove = useCallback((slug: string) => {
    setSlugs((s) => s.filter((x) => x !== slug));
  }, []);

  const value = useMemo<SelectionValue>(
    () => ({
      slugs,
      has: (slug) => slugs.includes(slug),
      toggle,
      remove,
      clear: () => setSlugs([]),
      open,
      setOpen,
      ready,
    }),
    [slugs, toggle, remove, open, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSelection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSelection must be used inside SelectionProvider");
  return ctx;
}
