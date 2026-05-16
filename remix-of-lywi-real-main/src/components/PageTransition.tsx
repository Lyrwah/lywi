import { motion, useReducedMotion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Soft cross-fade on subpage navigation.
 * - Skipped on the very first paint (avoids SSR hydration mismatch and
 *   the homepage "jitter" on initial load).
 * - Pure opacity (no translate) so re-entering the homepage doesn't feel
 *   like the layout is jumping.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  // Key from the currently rendered match, not `location`. `location` changes
  // as soon as navigation starts, before the new route is painted, which
  // remounts the old homepage and replays its FadeUp animations.
  const routeKey = useRouterState({ select: (s) => s.matches.at(-1)?.id ?? "root" });
  const reduce = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (reduce || !hydrated) return <>{children}</>;

  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
