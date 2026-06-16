import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DESIGNS, useDesign } from '../design/DesignContext';
import { PaletteIcon } from './icons';

/**
 * Floating control (bottom-right on desktop, in-flow trigger at the page end
 * on mobile) that lets the visitor pick one of the three portfolio designs.
 * Choice persists to localStorage.
 */
export function DesignSwitcher() {
  const { design, meta, setDesign, panelOpen, setPanelOpen } = useDesign();
  const ref = useRef<HTMLDivElement>(null);

  // Close on Escape (outside-click handled by the overlay).
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPanelOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panelOpen, setPanelOpen]);

  // Panel chrome swaps with the active design: crisp white + dark text on the
  // light Editorial theme, dark navy + white text on Terminal/Aurora.
  const light = meta.light;
  const panelChrome = light
    ? 'border-stone-200 bg-white text-stone-900'
    : 'border-white/10 bg-[#0b1120]/95 text-white';
  const triggerChrome = light
    ? 'border-stone-200 bg-white text-stone-900'
    : 'border-white/15 bg-[#0b1120]/90 text-white';

  // Row/ring tints can't ride on the panel's text colour, so they stay
  // theme-aware; row text is inherited from the panel + dimmed via opacity.
  const activeBg = light ? 'bg-black/[0.06]' : 'bg-white/10';
  const hoverBg = light ? 'hover:bg-black/[0.04]' : 'hover:bg-white/5';
  const ring = light ? 'ring-black/10' : 'ring-white/15';

  return (
    <div ref={ref} className="design-switcher z-[90] flex flex-col gap-3">
      <AnimatePresence>
        {panelOpen && (
          <>
            {/* Transparent tap-to-dismiss overlay behind the panel. */}
            <div
              className="fixed inset-0 z-[89]"
              onClick={() => setPanelOpen(false)}
              aria-hidden="true"
            />
            {/* Bug 1 — the panel is position: fixed on EVERY screen size, so it
                never sits in flow / pushes content (CLS-safe). */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className={`fixed bottom-20 left-4 right-4 z-[90] overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-xl md:left-auto md:w-[268px] ${panelChrome}`}
            >
              <p className="px-3 pb-1.5 pt-2 font-mono text-[10px] uppercase tracking-[0.16em] opacity-50">
                Choose a design
              </p>
              {DESIGNS.map((d) => {
                const active = d.id === design;
                return (
                  <button
                    key={d.id}
                    onClick={() => { setPanelOpen(false); setDesign(d.id); }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      active ? activeBg : hoverBg
                    }`}
                  >
                    <span
                      className={`mt-0.5 h-7 w-7 shrink-0 rounded-lg ring-1 ${ring}`}
                      style={{
                        background: `linear-gradient(135deg, ${d.swatch}, ${d.swatch}55)`,
                      }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold">{d.name}</span>
                        {active && (
                          <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-500">
                            active
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-[11px] opacity-60">{d.blurb}</span>
                    </span>
                  </button>
                );
              })}
              <p className="px-3 pb-1 pt-2 text-[10px] leading-snug opacity-50">
                Your pick is saved on this device.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <button
        onClick={() => setPanelOpen(!panelOpen)}
        aria-label="Switch portfolio design"
        aria-expanded={panelOpen}
        className={`group flex items-center gap-2 rounded-full border px-4 py-3 shadow-2xl backdrop-blur-xl transition-transform hover:-translate-y-0.5 ${triggerChrome}`}
      >
        <PaletteIcon width={17} height={17} className={light ? 'text-stone-500' : 'text-white/80'} />
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
