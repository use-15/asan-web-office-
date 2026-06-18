import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToolbarProps {
  onCommand?: (type: string, value?: any) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onCommand }) => {
  return (
    <div className="h-10 bg-white border-b border-[#edebe9] flex items-center px-4 space-x-2 shrink-0 overflow-x-auto no-scrollbar">
      {/* Undo/Redo Group */}
      <div className="flex items-center space-x-1 border-r border-[#edebe9] pr-2">
         <ToolbarButton icon={<Type className="w-4 h-4" />} tooltip="Clear Formatting" />
      </div>

      {/* Font Settings */}
      <div className="flex items-center space-x-1 border-r border-[#edebe9] pr-2">
        <div className="flex items-center bg-[#f3f2f1] hover:bg-[#eaeaea] rounded-sm px-2 py-1 cursor-pointer transition-colors border border-[#edebe9]">
          <span className="text-xs text-[#323130] mr-2 min-w-[80px]">Segoe UI</span>
          <ChevronDown className="w-3 h-3 text-[#605e5c]" />
        </div>
        <div className="flex items-center bg-[#f3f2f1] hover:bg-[#eaeaea] rounded-sm px-2 py-1 cursor-pointer transition-colors border border-[#edebe9]">
          <span className="text-xs text-[#323130] mr-2">11</span>
          <ChevronDown className="w-3 h-3 text-[#605e5c]" />
        </div>
      </div>

      {/* Style Settings */}
      <div className="flex items-center space-x-1 border-r border-[#edebe9] pr-2">
        <ToolbarButton icon={<Bold className="w-4 h-4" />} onClick={() => onCommand?.('bold')} />
        <ToolbarButton icon={<Italic className="w-4 h-4" />} onClick={() => onCommand?.('italic')} />
        <ToolbarButton icon={<Underline className="w-4 h-4" />} onClick={() => onCommand?.('underline')} />
      </div>

      {/* Alignment Settings */}
      <div className="flex items-center space-x-1">
        <ToolbarButton icon={<AlignLeft className="w-4 h-4" />} />
        <ToolbarButton icon={<AlignCenter className="w-4 h-4" />} />
        <ToolbarButton icon={<AlignRight className="w-4 h-4" />} />
      </div>
    </div>
  );
};

const ToolbarButton: React.FC<{ icon: React.ReactNode; active?: boolean; tooltip?: string; onClick?: () => void }> = ({ icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "p-1.5 rounded-sm hover:bg-[#f3f2f1] transition-colors",
      active ? "bg-[#c8c8c8]" : ""
    )}
  >
    {icon}
  </button>
);
