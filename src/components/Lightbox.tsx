import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { AtlasModule } from '../types';
import { CloseIcon } from './icons';

interface LightboxProps {
  modules: AtlasModule[];
  /** Index of the open module, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-screen image viewer for the Atlas screenshots.
 * Shared across all three designs so the gallery behaves identically.
 */
export function Lightbox({ modules, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      const next = (index + delta + modules.length) % modules.length;
      onNavigate(next);
    },
    [index, modules.length, onNavigate],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, go, onClose]);

  const active = index !== null ? modules[index] : null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} screenshot`}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <CloseIcon width={18} height={18} />
          </button>

          {/* Prev / Next */}
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous screenshot"
            className="absolute left-2 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next screenshot"
            className="absolute right-2 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>

          <motion.figure
            key={active.id}
            className="relative z-[1] w-full max-w-6xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.image}
              alt={`Atlas ERP — ${active.title}`}
              className="w-full rounded-lg border border-white/10 shadow-2xl"
            />
            <figcaption className="mt-4 flex flex-col items-center gap-1 text-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                {index !== null ? index + 1 : 0} / {modules.length} · {active.titleAr}
              </span>
              <span className="text-base font-semibold text-white">{active.title}</span>
              <span className="max-w-xl text-sm text-white/60">{active.description}</span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
