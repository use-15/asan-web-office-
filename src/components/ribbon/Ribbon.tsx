import React from 'react';
import { Tabs } from '../stitch/Tabs';

interface RibbonProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string }[];
  groups: React.ReactNode;
  brandColor?: string;
}

export const Ribbon: React.FC<RibbonProps> = ({
  activeTab,
  setActiveTab,
  tabs,
  groups,
  brandColor
}) => {
  return (
    <div className="flex flex-col shrink-0 bg-stitch-neutral-100">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        color={brandColor}
      />
      <div className="h-20 flex items-center px-4 space-x-6 overflow-x-auto border-b border-stitch-neutral-300">
        {groups}
      </div>
    </div>
  );
};

export const RibbonGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col h-full py-1 border-r border-stitch-neutral-300 pr-6 last:border-r-0">
    <div className="flex-1 flex items-center space-x-2">
      {children}
    </div>
    <div className="text-[10px] text-stitch-neutral-500 text-center mt-1 uppercase tracking-tighter">
      {label}
    </div>
  </div>
);
