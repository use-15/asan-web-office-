import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Tab {
  id: string;
  label: string;
}

interface StitchTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export const StitchTabs: React.FC<StitchTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}) => {
  return (
    <div className={cn('flex space-x-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'px-4 py-1 text-xs font-semibold uppercase tracking-wider transition-all border-b-2',
            activeTab === tab.id
              ? 'border-office-blue text-stitch-text'
              : 'border-transparent text-stitch-text-secondary hover:text-stitch-text hover:bg-office-neutral-20'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
