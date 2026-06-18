import React from 'react'
import { cn } from '../../lib/utils'

interface AppShellProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (mod: 'Word' | 'Sheet' | 'Slide' | 'PDF' | 'Home') => void;
  ribbon?: React.ReactNode;
  toolbar?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children, activeModule, onModuleChange, ribbon, toolbar }) => {
  const moduleColors: Record<string, string> = {
    'Word': 'bg-[#2b579a]',
    'Sheet': 'bg-[#217346]',
    'Slide': 'bg-[#d24726]',
    'PDF': 'bg-[#b30b00]',
    'Home': 'bg-[#005a9e]'
  };

  const activeColor = moduleColors[activeModule] || 'bg-[#005a9e]';

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#faf9f8] text-[#323130] font-sans">
      {/* Top Global Navigation Bar */}
      <header className={cn("h-10 text-white flex items-center px-4 z-20 shrink-0 transition-colors duration-300", activeColor)}>
        <div
          className="text-lg font-bold mr-6 cursor-pointer hover:opacity-80 transition-opacity flex items-center"
          onClick={() => onModuleChange('Home')}
        >
          <span className="mr-2">Asan Office</span>
        </div>
        <nav className="flex h-full">
          {(['Word', 'Sheet', 'Slide', 'PDF'] as const).map((mod) => (
            <button
              key={mod}
              onClick={() => onModuleChange(mod)}
              className={cn(
                "px-4 h-full text-xs font-medium hover:bg-white/10 transition-colors border-b-2",
                activeModule === mod ? 'border-white bg-white/20' : 'border-transparent'
              )}
            >
              {mod}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
           <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-[10px] font-bold">JD</div>
        </div>
      </header>

      {/* Module Interface (Ribbon + Toolbar) */}
      {activeModule !== 'Home' && (
        <div className="flex flex-col shrink-0">
          {ribbon}
          {toolbar}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#dadad9]">
        {children}
      </main>

      {/* Global Status Bar */}
      <footer className={cn("h-6 text-white text-[10px] flex items-center px-3 shrink-0 transition-colors duration-300", activeColor)}>
        <div className="flex space-x-4 items-center">
          <span className="uppercase tracking-widest font-semibold">Ready</span>
          <div className="h-3 w-px bg-white/30" />
          <span className="opacity-90">OFFLINE PROTECTED</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
           <span className="opacity-80">{activeModule === 'Home' ? 'Asan Office 1.0.0' : `Asan ${activeModule} 1.0.0`}</span>
        </div>
      </footer>
    </div>
  )
}
