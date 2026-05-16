import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Subtle fade + rise on scroll-into-view.
 * - Respects prefers-reduced-motion.
 * - Skips animation during SSR / first paint to avoid hydration mismatch
 *   and the "page jitter" caused by hidden-then-visible flashes.
 */
export function FadeUp({ children, delay = 0, y = 16, once = true, ...rest }: FadeUpProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (reduce || !mounted) return <div {...(rest as object)}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
