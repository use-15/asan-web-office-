import React from 'react';
import { cn } from '../../lib/utils';

interface RibbonTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface RibbonProps {
  tabs: RibbonTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export const Ribbon: React.FC<RibbonProps> = ({ tabs, activeTab, onTabChange, className }) => {
  return (
    <div className={cn("bg-[#f3f2f1] border-b border-[#edebe9] flex flex-col shrink-0 select-none", className)}>
      {/* Tab Headers */}
      <div className="flex h-8 px-4 items-end space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 h-7 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center",
              activeTab === tab.id
                ? "bg-white border border-[#edebe9] border-b-transparent rounded-t-sm text-[#323130]"
                : "text-[#323130] hover:bg-[#eaeaea] border border-transparent"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content (The Ribbon body) */}
      <div className="h-24 bg-white border-t border-[#edebe9] flex items-center px-4 overflow-hidden">
        {tabs.find(t => t.id === activeTab)?.content}
      </div>
    </div>
  );
};

export const RibbonGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col h-full border-r border-[#f3f2f1] last:border-r-0 px-2 py-1 min-w-fit">
    <div className="flex-1 flex items-center space-x-1">
      {children}
    </div>
    <div className="text-[10px] text-center text-[#605e5c] mt-auto uppercase tracking-tight">
      {label}
    </div>
  </div>
);

export const RibbonButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  large?: boolean;
}> = ({ icon, label, onClick, active, disabled, large }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex flex-col items-center justify-center rounded-sm transition-colors",
      large ? "w-16 h-full p-1" : "px-2 py-1",
      active ? "bg-[#c8c8c8]" : "hover:bg-[#f3f2f1]",
      disabled && "opacity-30 cursor-not-allowed"
    )}
  >
    <div className={cn("text-[#323130]", large ? "mb-1 scale-125" : "scale-90")}>
      {icon}
    </div>
    <div className={cn("text-[#323130] leading-tight", large ? "text-[11px]" : "text-[10px]")}>
      {label}
    </div>
  </button>
);
