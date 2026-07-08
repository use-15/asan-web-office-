import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  color?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, color = 'var(--color-office-blue)' }) => {
  return (
    <div className="flex px-4 pt-1 space-x-6 border-b border-stitch-neutral-300 bg-stitch-neutral-100">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "pb-1 text-[11px] font-semibold uppercase tracking-wider cursor-pointer border-b-2 transition-all",
            activeTab === tab.id
              ? "border-current text-office-blue"
              : "border-transparent text-stitch-neutral-600 hover:text-stitch-neutral-900"
          )}
          style={{ borderColor: activeTab === tab.id ? color : 'transparent', color: activeTab === tab.id ? color : undefined }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
