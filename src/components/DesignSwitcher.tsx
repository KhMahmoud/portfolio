import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DESIGNS, useDesign } from '../design/DesignContext';
import { PaletteIcon } from './icons';

/**
 * Floating control (bottom-right) that lets the visitor preview and pick
 * one of the three portfolio designs. Choice persists to localStorage.
 */
export function DesignSwitcher() {
  const { design, setDesign } = useDesign();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-[268px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120]/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            <p className="px-3 pb-1.5 pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              Choose a design
            </p>
            {DESIGNS.map((d) => {
              const active = d.id === design;
              return (
                <button
                  key={d.id}
                  onClick={() => setDesign(d.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    active ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span
                    className="mt-0.5 h-7 w-7 shrink-0 rounded-lg ring-1 ring-white/15"
                    style={{
                      background: `linear-gradient(135deg, ${d.swatch}, ${d.swatch}55)`,
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-white">{d.name}</span>
                      {active && (
                        <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-300">
                          active
                        </span>
                      )}
                    </span>
                    <span className="block truncate text-[11px] text-white/45">{d.blurb}</span>
                  </span>
                </button>
              );
            })}
            <p className="px-3 pb-1 pt-2 text-[10px] leading-snug text-white/30">
              Your pick is saved on this device.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch portfolio design"
        aria-expanded={open}
        className="group flex items-center gap-2 rounded-full border border-white/15 bg-[#0b1120]/90 px-4 py-3 text-white shadow-2xl backdrop-blur-xl transition-transform hover:-translate-y-0.5"
      >
        <PaletteIcon width={17} height={17} className="text-white/80" />
        <span className="text-[12px] font-semibold tracking-wide">Design</span>
        <span className="flex gap-1">
          {DESIGNS.map((d) => (
            <span
              key={d.id}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                d.id === design ? 'w-4' : 'opacity-40'
              }`}
              style={{ backgroundColor: d.swatch }}
            />
          ))}
        </span>
      </button>
    </div>
  );
}
