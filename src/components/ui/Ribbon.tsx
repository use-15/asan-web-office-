import React from 'react';

interface RibbonProps {
  children: React.ReactNode;
}

export const Ribbon: React.FC<RibbonProps> = ({ children }) => {
  return (
    <div className="h-28 bg-office-neutral-100 border-b border-office-neutral-300 flex flex-col shrink-0 select-none">
      {children}
    </div>
  );
};

interface RibbonTabsProps {
  children: React.ReactNode;
}

export const RibbonTabs: React.FC<RibbonTabsProps> = ({ children }) => {
  return (
    <div className="flex px-4 pt-1 space-x-1">
      {children}
    </div>
  );
};

interface RibbonTabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  colorClass?: string;
}

export const RibbonTab: React.FC<RibbonTabProps> = ({ label, active, onClick, colorClass = 'border-office-blue' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
        active ? `${colorClass} text-slate-900` : 'border-transparent text-slate-500 hover:bg-office-neutral-200'
      }`}
    >
      {label}
    </button>
  );
};

interface RibbonContentProps {
  children: React.ReactNode;
}

export const RibbonContent: React.FC<RibbonContentProps> = ({ children }) => {
  return (
    <div className="flex-1 flex items-center px-4 space-x-4 overflow-x-auto">
      {children}
    </div>
  );
};

interface RibbonGroupProps {
  label?: string;
  children: React.ReactNode;
}

export const RibbonGroup: React.FC<RibbonGroupProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col items-center border-r border-office-neutral-300 pr-4 last:border-r-0 h-full py-2">
      <div className="flex-1 flex items-center space-x-1">
        {children}
      </div>
      {label && <span className="text-[10px] text-office-neutral-500 mt-1">{label}</span>}
    </div>
  );
};

interface IconButtonProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick, active, disabled, title }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex flex-col items-center justify-center p-1 rounded transition-colors ${
        active ? 'bg-office-neutral-300' : 'hover:bg-office-neutral-200'
      } ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {icon}
      </div>
      {label && <span className="text-[10px] mt-0.5">{label}</span>}
    </button>
  );
};
