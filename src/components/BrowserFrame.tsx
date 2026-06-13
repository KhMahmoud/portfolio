import type { ReactNode } from 'react';

interface BrowserFrameProps {
  children: ReactNode;
  /** Classes for the outer frame (background, border, radius, shadow). */
  className?: string;
  /** Classes for the top chrome bar. */
  barClassName?: string;
  /** Classes for the three window dots' container; dots inherit currentColor. */
  url?: string;
  /** Tailwind text color class for the URL pill text. */
  urlClassName?: string;
}

/**
 * A lightweight browser/app window chrome wrapper so product screenshots
 * read as a live application. Theming is fully driven by class props so
 * each design can restyle it without duplicating the markup.
 */
export function BrowserFrame({
  children,
  className = '',
  barClassName = '',
  url = 'atlas.app',
  urlClassName = '',
}: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex items-center gap-2 px-4 py-2.5 ${barClassName}`}>
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span
          className={`mx-auto truncate rounded-md px-3 py-1 font-mono text-[10px] tracking-wide ${urlClassName}`}
        >
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
