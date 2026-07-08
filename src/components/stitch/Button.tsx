import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'action';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'secondary',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-office-blue text-white hover:bg-office-blue/90',
    secondary: 'bg-white border border-stitch-neutral-300 text-stitch-neutral-900 hover:bg-stitch-neutral-100',
    ghost: 'hover:bg-stitch-neutral-100 text-stitch-neutral-700',
    action: 'hover:bg-white/10 text-white',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-8 w-8',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};
