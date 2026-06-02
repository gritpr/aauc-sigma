import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[#5E50A1] text-white hover:bg-[#4d4288] shadow-md shadow-[#5E50A1]/25",
  secondary: "bg-white text-[#5E50A1] border border-[#5E50A1]/30 hover:bg-[#f5f3fa]",
  outline:
    "border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
