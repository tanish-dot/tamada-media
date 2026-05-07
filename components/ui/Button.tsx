"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "inverse";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
}

const sizeClasses = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-xs",
  lg: "px-10 py-4.5 text-sm",
};

const variantClasses = {
  primary: "bg-[#C9A84C] text-[#F5E6D0] hover:bg-[#A08030] border border-[#C9A84C]",
  outline: "bg-transparent text-[#C9A84C] border border-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#F5E6D0]",
  ghost: "bg-transparent text-[#0A0A0A] border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5E6D0]",
  inverse: "bg-[#F5E6D0] text-[#0A0A0A] border border-[#F5E6D0] hover:bg-transparent hover:text-[#F5E6D0]",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `
    inline-flex items-center gap-2 font-bold tracking-widest uppercase
    transition-all duration-300 cursor-pointer
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim();

  const content = (
    <motion.span
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    if (external) {
      return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
    }
    return <Link href={href}>{content}</Link>;
  }

  return <button onClick={onClick}>{content}</button>;
}
