import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<SelectProps> = ({ className, label, children, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-[10px] text-stitch-neutral-600 mb-0.5 ml-1">{label}</label>}
      <select
        className={cn(
          "h-8 bg-white border border-stitch-neutral-300 rounded px-2 text-xs outline-none focus:border-office-blue hover:border-stitch-neutral-400 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};
