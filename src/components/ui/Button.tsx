import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "gold" | "teal";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/25",
  secondary:
    "bg-white text-primary border border-primary/30 hover:bg-surface-lavender shadow-sm",
  outline:
    "border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm",
  gold:
    "bg-accent-gold text-primary-dark hover:bg-accent-gold/90 shadow-md shadow-accent-gold/30 font-bold",
  teal:
    "bg-accent-teal text-white hover:bg-accent-teal/90 shadow-md shadow-accent-teal/25",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
