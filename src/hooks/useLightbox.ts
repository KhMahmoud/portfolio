import { useCallback, useState } from 'react';

/** Shared open/close/navigate state for the Atlas screenshot Lightbox. */
export function useLightbox() {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const navigate = useCallback((i: number) => setIndex(i), []);

  return { index, open, close, navigate };
}
