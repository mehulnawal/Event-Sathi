"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "emergency" | "violet";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  emergency:
    "relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-7 py-3.5 text-sm font-bold text-white glow-amber transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]",
  violet:
    "relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white glow-violet transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
};

const sizes: Record<string, string> = {
  sm: "!px-5 !py-2.5 text-xs",
  md: "",
  lg: "!px-9 !py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  size = "md",
}: ButtonProps) {
  const classes = `${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <motion.span
      className="flex items-center justify-center gap-2"
      whileHover={{ x: variant === "ghost" ? 0 : 2 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
