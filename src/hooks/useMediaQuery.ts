import { useEffect, useState } from 'react';

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 * SSR-safe: returns `false` during the first server render, then hydrates.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** Semantic Sangat breakpoints. */
export const breakpoints = {
  /** Below this width, primitives switch to compact mobile layouts. */
  mobile: 720,
  /** Below this, the partner sidebar collapses to a drawer. */
  tablet: 960,
  /** Above this, we can afford a desktop-class supplementary panel. */
  desktop: 1180,
} as const;

export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${breakpoints.mobile - 1}px)`);
}

export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet - 1}px)`,
  );
}

export function useIsCompactPartner(): boolean {
  return useMediaQuery(`(max-width: ${breakpoints.tablet - 1}px)`);
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${breakpoints.desktop}px)`);
}
