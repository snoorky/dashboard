import { ReactNode } from "react";

export interface ButtonProps {
  isLoading?: boolean;
  label: string;
  loadingText?: string;
  type: "submit" | "reset" | "button";
}

export interface InputProps {
  id: string;
  autoComplete?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  required: boolean;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectProps {
  id: string;
  label?: string;
  className?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export interface NavItemProps {
  icon: ReactNode;
  name: string;
  url: string;
}