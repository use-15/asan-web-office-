import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StitchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'office-word' | 'office-sheet' | 'office-slide' | 'office-pdf';
  size?: 'sm' | 'md' | 'lg';
}

export const StitchButton: React.FC<StitchButtonProps> = ({
  className,
  variant = 'secondary',
  size = 'md',
  ...props
}) => {
  const variants = {
    primary: 'bg-stitch-primary text-white hover:bg-office-blue-hover',
    secondary: 'bg-white border border-office-neutral-40/50 text-stitch-text hover:bg-office-neutral-20',
    ghost: 'bg-transparent text-stitch-text hover:bg-office-neutral-20',
    'office-word': 'bg-office-word text-white hover:opacity-90',
    'office-sheet': 'bg-office-sheet text-white hover:opacity-90',
    'office-slide': 'bg-office-slide text-white hover:opacity-90',
    'office-pdf': 'bg-office-pdf text-white hover:opacity-90',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stitch-primary disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
