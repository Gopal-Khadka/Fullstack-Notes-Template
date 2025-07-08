import React from "react";
import { type LucideProps } from "lucide-react";

interface ToolbarButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
}

export const ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  title,
  icon: Icon,
  className = "",
}: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      inline-flex items-center justify-center rounded-md text-sm font-medium
      ring-offset-background transition-colors focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:pointer-events-none disabled:opacity-50 h-8 w-8
      hover:bg-accent hover:text-accent-foreground
      ${isActive ? "bg-accent text-accent-foreground" : ""}
      ${className}
    `}
  >
    <Icon className="h-4 w-4" />
  </button>
);
