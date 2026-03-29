import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface PillLabelProps {
  children: ReactNode;
  className?: string;
}

export const PillLabel = ({ children, className }: PillLabelProps) => {
  return (
    <div className={cn("inline-block px-4 py-1.5 rounded-full bg-accent/5 backdrop-blur-xl border border-accent/10 text-[9px] font-bold uppercase tracking-[0.3em] text-accent", className)}>
      {children}
    </div>
  );
};
