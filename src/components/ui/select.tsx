"use client"

import { SelectProps } from "@/utils/interfaces";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function Select(props: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {props.label && (
        <label htmlFor={props.id} className="block text-sm font-medium mb-0.5">
          {props.label}
        </label>
      )}
      <button
        id={props.id}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-sm w-full flex items-center justify-between p-3 rounded-lg outline-none border border-gray-600 bg-gray-700"
      >
        <span className="">{props.value || props.options[0]}</span>
        <ChevronDown className={`w-5 h-5 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-32 rounded-lg shadow-lg text-sm overflow-auto border border-gray-600 bg-gray-700">
          {props.options.map((option) => (
            <button key={option} className="block w-full text-left px-4 py-2 border-b border-gray-600 last:border-b-0"
              onClick={() => {
                props.onChange(option);
                setIsOpen(false);
              }}
            >
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}