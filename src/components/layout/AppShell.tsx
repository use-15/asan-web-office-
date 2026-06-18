import React from 'react'
import { cn } from '../../lib/utils'
import {
  Search, ChevronDown, Minus, Square, X, Save, Undo2, Redo2, HelpCircle,
  Monitor, BookOpen, Layout, MinusIcon, PlusIcon, Share2, MessageSquare
} from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode;
  activeModule: 'Word' | 'Sheet' | 'Slide' | 'PDF' | 'Home';
  onModuleChange: (mod: 'Word' | 'Sheet' | 'Slide' | 'PDF' | 'Home') => void;
  ribbon?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children, activeModule, onModuleChange, ribbon }) => {
  const moduleColors: Record<string, string> = {
    'Word': '#2b579a',
    'Sheet': '#217346',
    'Slide': '#d24726',
    'PDF': '#b30b00',
    'Home': '#005a9e'
  };

  const activeColor = moduleColors[activeModule] || '#005a9e';

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#faf9f8] text-[#323130] font-sans">
      {/* Top Title Bar (Windows Style) */}
      <header className="h-8 text-white flex items-center px-2 shrink-0 select-none" style={{ backgroundColor: activeColor }}>
        <div className="flex items-center space-x-3 text-xs">
           <div className="flex items-center space-x-1">
              <span className="font-semibold">AutoSave</span>
              <div className="w-8 h-4 bg-white/20 rounded-full relative cursor-pointer">
                 <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full" />
              </div>
              <span className="opacity-80">Off</span>
           </div>
           <Save className="w-4 h-4 opacity-80 cursor-pointer hover:opacity-100" />
           <Undo2 className="w-4 h-4 opacity-80 cursor-pointer hover:opacity-100" />
           <Redo2 className="w-4 h-4 opacity-80 cursor-pointer hover:opacity-100" />
           <ChevronDown className="w-3 h-3 opacity-60 cursor-pointer" />
        </div>

        <div
          className="flex-1 flex justify-center items-center text-xs cursor-pointer hover:opacity-80"
          onClick={() => onModuleChange('Home')}
        >
           <span className="font-medium">Document1 - Asan {activeModule}</span>
        </div>

        <div className="flex-1 max-w-[400px] mx-4 relative group">
           <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-3.5 h-3.5 text-white/60" />
           </div>
           <input
              type="text"
              placeholder="Search"
              className="w-full bg-white/20 rounded-sm py-1 pl-9 pr-3 text-xs text-white placeholder-white/60 outline-none focus:bg-white focus:text-[#323130] transition-all"
           />
        </div>

        <div className="flex items-center space-x-4 pr-2">
           <div className="flex items-center space-x-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-bold">KS</div>
              <span className="text-[11px]">Kamika Stewart</span>
           </div>
           <div className="flex items-center space-x-3">
              <Minus className="w-4 h-4 opacity-80 cursor-pointer hover:bg-white/10" />
              <Square className="w-3 h-3 opacity-80 cursor-pointer hover:bg-white/10" />
              <X className="w-4 h-4 opacity-80 cursor-pointer hover:bg-red-500" />
           </div>
        </div>
      </header>

      {/* Ribbon Tabs Header */}
      <nav className="h-10 bg-[#f3f2f1] flex items-end px-4 space-x-1 shrink-0 border-b border-[#edebe9]">
         {(['File', 'Home', 'Insert', 'Design', 'Layout', 'References', 'Mailings', 'Review', 'View', 'Help'] as const).map((tab) => (
            <button
               key={tab}
               className={cn(
                  "px-4 h-8 text-[13px] hover:bg-[#eaeaea] transition-colors border-b-2 border-transparent",
                  tab === 'Home' ? "bg-white border-b-office-blue font-semibold" : "text-[#323130]"
               )}
            >
               {tab}
            </button>
         ))}
         <div className="ml-auto flex items-center space-x-4 h-full pb-1">
            <button className="flex items-center space-x-1 text-[#005a9e] text-xs font-medium hover:bg-white/50 px-2 py-1 rounded">
               <Share2 className="w-4 h-4" />
               <span>Share</span>
            </button>
            <button className="flex items-center space-x-1 text-[#323130] text-xs font-medium hover:bg-white/50 px-2 py-1 rounded">
               <MessageSquare className="w-4 h-4" />
               <span>Comments</span>
            </button>
         </div>
      </nav>

      {/* Module Interface (Ribbon) */}
      {activeModule !== 'Home' && (
        <div className="flex flex-col shrink-0">
          {ribbon}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#e6e6e6]">
        {children}
      </main>

      {/* Word-style Status Bar */}
      <footer className="h-6 bg-[#f3f2f1] border-t border-[#edebe9] text-[11px] flex items-center px-4 shrink-0 text-[#323130] select-none">
        <div className="flex items-center space-x-4">
          <span className="hover:bg-[#eaeaea] px-2 py-0.5 rounded cursor-pointer">Page 1 of 1</span>
          <span className="hover:bg-[#eaeaea] px-2 py-0.5 rounded cursor-pointer">0 words</span>
          <div className="flex items-center space-x-1 hover:bg-[#eaeaea] px-2 py-0.5 rounded cursor-pointer">
             <HelpCircle className="w-3.5 h-3.5" />
             <span>English (Jamaica)</span>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-6">
           <div className="flex items-center space-x-2">
              <span className="hover:bg-[#eaeaea] px-1 py-0.5 rounded cursor-pointer">Focus</span>
              <BookOpen className="w-4 h-4 opacity-70 cursor-pointer" />
              <Monitor className="w-4 h-4 opacity-70 cursor-pointer" />
              <Layout className="w-4 h-4 opacity-70 cursor-pointer" />
           </div>
           <div className="flex items-center space-x-3 w-48">
              <MinusIcon className="w-3.5 h-3.5 opacity-60 cursor-pointer" />
              <div className="flex-1 h-0.5 bg-[#c8c6c4] relative">
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-[#605e5c]" />
              </div>
              <PlusIcon className="w-3.5 h-3.5 opacity-60 cursor-pointer" />
              <span className="w-8 text-right">120%</span>
           </div>
        </div>
      </footer>
    </div>
  )
}
