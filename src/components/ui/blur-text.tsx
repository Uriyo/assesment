"use client";

import { useRef } from "react";
import { motion, useInView, Variant, Variants, Easing } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Variant;
  animationTo?: Variant;
  easing?: Easing;
  onAnimationComplete?: () => void;
}

const defaultAnimationFrom: Variant = {
  filter: "blur(10px)",
  opacity: 0,
  y: 5,
};

const defaultAnimationTo: Variant = {
  filter: "blur(0px)",
  opacity: 1,
  y: 0,
};

export function BlurText({
  text,
  delay = 0.05,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "easeOut",
  onAnimationComplete,
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: rootMargin as `${number}px`,
    amount: threshold,
  });

  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const fromVariant = animationFrom || {
    ...defaultAnimationFrom,
    y: direction === "top" ? -5 : 5,
  };

  const toVariant = animationTo || defaultAnimationTo;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: fromVariant,
    visible: {
      ...toVariant,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      className={cn("flex flex-wrap", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onAnimationComplete={onAnimationComplete}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className={animateBy === "words" ? "mr-[0.25em]" : ""}
        >
          {element}
        </motion.span>
      ))}
    </motion.p>
  );
}
