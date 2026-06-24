import React from 'react'
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AppShellProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (mod: any) => void;
}

export const AppShell: React.FC<AppShellProps> = ({ children, activeModule, onModuleChange }) => {
  const themeColors: Record<string, string> = {
    Word: 'bg-office-word',
    Sheet: 'bg-office-sheet',
    Slide: 'bg-office-slide',
    PDF: 'bg-office-pdf',
    Home: 'bg-office-blue',
  };

  const currentTheme = themeColors[activeModule] || themeColors.Home;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-office-neutral-20 text-stitch-text font-sans selection:bg-office-blue-light">
      {/* Top Global Navigation Bar (Thin) */}
      <header className={cn("h-10 text-white flex items-center px-4 z-20 shrink-0 transition-colors duration-300", currentTheme)}>
        <div
          className="text-lg font-bold mr-6 cursor-pointer hover:opacity-80 transition-opacity flex items-center"
          onClick={() => onModuleChange('Home')}
        >
          <span className="mr-2">Asan Office</span>
        </div>
        <nav className="flex h-full">
          {['Word', 'Sheet', 'Slide', 'PDF'].map((mod) => (
            <button
              key={mod}
              onClick={() => onModuleChange(mod)}
              className={cn(
                "px-4 h-full text-xs font-medium hover:bg-white/10 transition-all border-b-2",
                activeModule === mod ? 'border-white bg-white/20' : 'border-transparent'
              )}
            >
              {mod}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
           <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold border border-white/30">AO</div>
        </div>
      </header>

      {/* Main Module Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {children}
      </div>

      {/* Global Status Bar */}
      <footer className={cn("h-6 text-white text-[10px] flex items-center px-3 shrink-0 transition-colors duration-300", currentTheme)}>
        <div className="flex space-x-4">
          <span className="uppercase tracking-wider font-bold">Ready</span>
          <span className="opacity-70 font-medium">OFFLINE MODE</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
           <span className="opacity-70 font-medium">{activeModule === 'Home' ? 'Asan Office 1.0.0' : `Asan ${activeModule} 1.0.0`}</span>
        </div>
      </footer>
    </div>
  )
}
