import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDesign } from '../design/DesignContext';
import { ArrowUpIcon } from './icons';

/**
 * "Back to top" control that appears once the visitor nears the bottom of
 * the page and smooth-scrolls back to the hero on click.
 */
export function BackToTop() {
  const { meta } = useDesign();
  const [visible, setVisible] = useState(false);

  // Outlined style that inverts on hover. Tuned per design so it stays
  // visible: dark ink on light (Editorial), white on the dark designs.
  const outline = meta.light
    ? 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-stone-50'
    : 'border-white/70 text-white hover:bg-white hover:text-stone-900';

  useEffect(() => {
    const check = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const full = document.documentElement.scrollHeight;
      setVisible(scrolled >= full - 120);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    // Re-check when scroll-triggered animations grow the page height.
    const ro = new ResizeObserver(check);
    ro.observe(document.body);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      ro.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className={`back-to-top z-[90] flex items-center gap-2 rounded-full border bg-transparent px-4 py-3 shadow-sm backdrop-blur-xl transition-all duration-200 ease-[ease] ${outline}`}
        >
          <ArrowUpIcon width={15} height={15} />
          <span className="text-[12px] font-semibold tracking-wide">Back to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
