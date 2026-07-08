import React from 'react'
import { FileText, Table, Presentation, FileDigit, LayoutDashboard, Settings } from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (mod: any) => void;
}

export const AppShell: React.FC<AppShellProps> = ({ children, activeModule, onModuleChange }) => {
  const getBrandColor = () => {
    switch (activeModule) {
      case 'Word': return 'bg-office-word';
      case 'Sheet': return 'bg-office-sheet';
      case 'Slide': return 'bg-office-slide';
      case 'PDF': return 'bg-office-pdf';
      default: return 'bg-office-blue';
    }
  };

  const getModuleIcon = (mod: string) => {
    switch (mod) {
      case 'Word': return <FileText size={14} />;
      case 'Sheet': return <Table size={14} />;
      case 'Slide': return <Presentation size={14} />;
      case 'PDF': return <FileDigit size={14} />;
      default: return <LayoutDashboard size={14} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-stitch-neutral-100 text-stitch-neutral-900 font-sans">
      {/* Top Global Navigation Bar */}
      <header className={`h-12 ${getBrandColor()} text-white flex items-center px-4 z-20 shrink-0 transition-colors duration-300`}>
        <div
          className="flex items-center text-lg font-bold mr-8 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onModuleChange('Home')}
        >
          <div className="bg-white text-current rounded-lg p-1 mr-2 transition-colors">
             {getModuleIcon(activeModule)}
          </div>
          <span className="tracking-tight">Asan Office</span>
        </div>
        <nav className="flex h-full">
          {['Word', 'Sheet', 'Slide', 'PDF'].map((mod) => (
            <button
              key={mod}
              onClick={() => onModuleChange(mod)}
              className={`px-6 h-full text-[13px] font-medium hover:bg-white/10 transition-colors border-b-4 flex items-center space-x-2 ${
                activeModule === mod ? 'border-white bg-white/20' : 'border-transparent'
              }`}
            >
              <span>{mod}</span>
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-2">
           <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Settings size={18} /></button>
           <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold border border-white/30 ml-2">
             JD
           </div>
        </div>
      </header>

      {/* Main Module Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {children}
      </div>

      {/* Global Status Bar */}
      <footer className={`${getBrandColor()} text-white text-[10px] h-6 flex items-center px-4 shrink-0 transition-colors duration-300`}>
        <div className="flex items-center space-x-4">
          <span className="uppercase tracking-widest font-bold">Ready</span>
          <div className="w-px h-3 bg-white/30" />
          <span className="opacity-80 flex items-center">
             <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
             OFFLINE MODE
          </span>
        </div>
        <div className="ml-auto flex items-center space-x-6 opacity-80">
           <span className="flex items-center hover:opacity-100 cursor-help">
             {activeModule === 'Home' ? 'Asan Office Suite v1.0.0' : `Asan ${activeModule} Core v1.0.0`}
           </span>
           <span className="uppercase tracking-widest">v1.0</span>
        </div>
      </footer>
    </div>
  )
}
