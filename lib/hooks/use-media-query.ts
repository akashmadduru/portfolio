"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media-query hook. Returns `false` until mounted, then the live match.
 * @example const isDesktop = useMediaQuery("(min-width: 768px)");
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
