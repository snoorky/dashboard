"use client"

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  id: string;
  label: string;
  className?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function Select(props: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = props.options.find((opt) => opt.value === props.value);
  const displayLabel = selectedOption ? selectedOption.label : props.value;

  return (
    <div className="relative">
      <label htmlFor={props.id} className="block text-sm font-medium mb-0.5">{props.label}</label>
      <button id={props.id} type="button" onClick={() => setIsOpen((prev) => !prev)}
        className="text-sm w-full flex items-center justify-between p-3 rounded-lg outline-none border border-surface bg-dark/4"
      >
        <span className="">{displayLabel}</span>
        <ChevronDown className={`w-5 h-5 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-32 rounded-lg shadow-lg text-sm overflow-auto border border-surface bg-white">
          {props.options.map((option) => (
            <button key={option.value}
              className="block w-full text-left px-4 py-2 border-b border-surface last:border-b-0"
              onClick={() => {
                props.onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}