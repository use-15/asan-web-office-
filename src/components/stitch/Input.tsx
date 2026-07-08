import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ className, label, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-[10px] text-stitch-neutral-600 mb-0.5 ml-1">{label}</label>}
      <input
        className={cn(
          "h-8 bg-white border border-stitch-neutral-300 rounded px-2 text-xs outline-none focus:border-office-blue hover:border-stitch-neutral-400",
          className
        )}
        {...props}
      />
    </div>
  );
};
