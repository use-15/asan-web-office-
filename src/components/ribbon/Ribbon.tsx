import React from 'react';
import { StitchTabs } from '../stitch/StitchTabs';

interface RibbonProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
  themeColor?: string;
}

export const Ribbon: React.FC<RibbonProps> = ({
  tabs,
  activeTab,
  onTabChange,
  children,
}) => {
  return (
    <div className="h-32 bg-office-neutral-20 border-b border-office-neutral-40 flex flex-col shrink-0 shadow-stitch-sm">
      <div className="px-4 py-1 flex items-center">
        <StitchTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
      </div>
      <div className="flex-1 flex items-center px-6 space-x-6 overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

export const RibbonGroup: React.FC<{ label?: string; children: React.ReactNode }> = ({ label, children }) => {
  return (
    <div className="flex flex-col items-center h-full py-1 border-r border-office-neutral-40 pr-4 last:border-r-0">
      <div className="flex-1 flex items-center space-x-1">
        {children}
      </div>
      {label && <span className="text-[10px] text-office-neutral-100 mt-1 uppercase tracking-tight">{label}</span>}
    </div>
  );
};

export const RibbonButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}> = ({ icon, label, onClick, active, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center justify-center p-2 rounded-sm transition-colors min-w-[48px] ${
        active ? 'bg-office-blue-light text-office-blue' : 'hover:bg-office-neutral-30 text-stitch-text'
      } disabled:opacity-30`}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-[10px] leading-tight">{label}</span>
    </button>
  );
};
