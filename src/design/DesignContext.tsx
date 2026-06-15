import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export type DesignId = 'terminal' | 'aurora' | 'editorial';

export interface DesignMeta {
  id: DesignId;
  /** Short name shown in the switcher. */
  name: string;
  /** One-line description of the vibe. */
  blurb: string;
  /** Whether this design renders on a light background (affects switcher chrome). */
  light: boolean;
  /** Accent swatch (hex) for the switcher preview dot. */
  swatch: string;
}

export const DESIGNS: DesignMeta[] = [
  {
    id: 'terminal',
    name: 'Terminal',
    blurb: 'Dark, technical, developer-first',
    light: false,
    swatch: '#38BDF8',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    blurb: 'Modern gradient glassmorphism',
    light: false,
    swatch: '#A855F7',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    blurb: 'Clean, light, corporate-ready',
    light: true,
    swatch: '#2563EB',
  },
];

const STORAGE_KEY = 'mk-portfolio-design';
const DEFAULT_DESIGN: DesignId = 'terminal';

function isDesignId(value: unknown): value is DesignId {
  return value === 'terminal' || value === 'aurora' || value === 'editorial';
}

function readInitial(): DesignId {
  if (typeof window === 'undefined') return DEFAULT_DESIGN;
  // URL override (?design=aurora) wins, so a link can deep-link a variant.
  const fromUrl = new URLSearchParams(window.location.search).get('design');
  if (isDesignId(fromUrl)) return fromUrl;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isDesignId(stored)) return stored;
  return DEFAULT_DESIGN;
}

interface DesignContextValue {
  design: DesignId;
  meta: DesignMeta;
  setDesign: (id: DesignId) => void;
  cycleDesign: () => void;
}

const DesignContext = createContext<DesignContextValue | null>(null);

export function DesignProvider({ children }: { children: ReactNode }) {
  const [design, setDesignState] = useState<DesignId>(readInitial);

  const setDesign = useCallback((id: DesignId) => {
    setDesignState(id);
  }, []);

  const cycleDesign = useCallback(() => {
    setDesignState((current) => {
      const idx = DESIGNS.findIndex((d) => d.id === current);
      return DESIGNS[(idx + 1) % DESIGNS.length].id;
    });
  }, []);

  // Persist choice and reflect it on <html> so global chrome can react.
  const isFirstRender = useRef(true);
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, design);
    document.documentElement.dataset.design = design;
    // Jump to the top when switching designs (but not on initial load).
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [design]);

  const meta = useMemo(
    () => DESIGNS.find((d) => d.id === design) ?? DESIGNS[0],
    [design],
  );

  const value = useMemo(
    () => ({ design, meta, setDesign, cycleDesign }),
    [design, meta, setDesign, cycleDesign],
  );

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
}

export function useDesign(): DesignContextValue {
  const ctx = useContext(DesignContext);
  if (!ctx) throw new Error('useDesign must be used within a DesignProvider');
  return ctx;
}
