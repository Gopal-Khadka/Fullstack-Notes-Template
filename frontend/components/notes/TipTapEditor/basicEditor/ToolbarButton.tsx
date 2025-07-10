import React from "react";
import { type LucideProps } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  <Button
    onClick={onClick}
    disabled={disabled}
    title={title}
    variant={isActive ? "default" : "outline"}
    className={className}
  >
    <Icon className="h-4 w-4" />
  </Button>
);
