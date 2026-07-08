import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-atlas-blue px-4 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-atlas-cyan focus:ring-offset-2 focus:ring-offset-atlas-card disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
