import React from 'react'

interface AppShellProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (mod: any) => void;
}

export const AppShell: React.FC<AppShellProps> = ({ children, activeModule, onModuleChange }) => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f3f2f1] text-slate-900 font-sans">
      {/* Top Global Navigation Bar (Thin) */}
      <header className="h-10 bg-office-blue text-white flex items-center px-4 z-20 shrink-0">
        <div
          className="text-lg font-bold mr-6 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onModuleChange('Home')}
        >
          Asan Office
        </div>
        <nav className="flex h-full">
          {['Word', 'Sheet', 'Slide', 'PDF'].map((mod) => (
            <button
              key={mod}
              onClick={() => onModuleChange(mod)}
              className={`px-4 h-full text-xs font-medium hover:bg-white/10 transition-colors border-b-2 ${
                activeModule === mod ? 'border-white bg-white/20' : 'border-transparent'
              }`}
            >
              {mod}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
           <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[10px]">JD</div>
        </div>
      </header>

      {/* Main Module Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {children}
      </div>

      {/* Global Status Bar */}
      <footer className="h-6 bg-office-blue text-white text-[10px] flex items-center px-3 shrink-0">
        <div className="flex space-x-4">
          <span className="uppercase tracking-wider">Ready</span>
          <span className="opacity-70">OFFLINE MODE</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
           <span className="opacity-70">{activeModule === 'Home' ? 'Asan Office 1.0.0' : `Asan ${activeModule} 1.0.0`}</span>
        </div>
      </footer>
    </div>
  )
}
