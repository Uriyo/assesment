"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [hasStarted, setHasStarted] = useState(false);

  // Determine the initial and target values based on direction
  const initialValue = direction === "down" ? to : from;
  const targetValue = direction === "down" ? from : to;

  // Spring physics configuration based on duration
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(initialValue, {
    damping,
    stiffness,
  });

  // Transform the spring value to a formatted string
  const displayValue = useTransform(springValue, (current) => {
    const rounded = Math.round(current);
    if (separator) {
      return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    return rounded.toString();
  });

  useEffect(() => {
    if (isInView && startWhen && !hasStarted) {
      const timeout = setTimeout(() => {
        setHasStarted(true);
        onStart?.();
        springValue.set(targetValue);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, startWhen, hasStarted, delay, springValue, targetValue, onStart]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (Math.round(latest) === targetValue && hasStarted) {
        onEnd?.();
      }
    });

    return () => unsubscribe();
  }, [springValue, targetValue, hasStarted, onEnd]);

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {displayValue}
    </motion.span>
  );
}
