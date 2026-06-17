import React from 'react'

interface ModuleHeaderProps {
  title: string;
  activeModule: 'Word' | 'Sheet' | 'Slide' | 'PDF' | 'Home';
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title, activeModule }) => {
  const bgClass = activeModule === 'Word' ? 'bg-office-word' :
                  activeModule === 'Sheet' ? 'bg-office-sheet' :
                  activeModule === 'Slide' ? 'bg-office-slide' :
                  activeModule === 'PDF' ? 'bg-office-pdf' : 'bg-office-blue';

  return (
    <div className={`${bgClass} h-10 flex items-center px-4 text-white font-medium shadow-sm`}>
      <span className="text-sm">{title}</span>
    </div>
  )
}
