import { useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import { WordModule } from './modules/word/WordModule'
import { SheetModule } from './modules/sheet/SheetModule'
import { SlideModule } from './modules/slide/SlideModule'
import { PdfModule } from './modules/pdf/PdfModule'
import { FileText, Table, Presentation, FileDigit, LayoutDashboard } from 'lucide-react'

type AppModule = 'Word' | 'Sheet' | 'Slide' | 'PDF' | 'Home';

function App() {
  const [activeModule, setActiveModule] = useState<AppModule>('Home');

  const getModuleIcon = (mod: string, size = 24) => {
    switch (mod) {
      case 'Word': return <FileText size={size} />;
      case 'Sheet': return <Table size={size} />;
      case 'Slide': return <Presentation size={size} />;
      case 'PDF': return <FileDigit size={size} />;
      default: return <LayoutDashboard size={size} />;
    }
  };

  return (
    <AppShell activeModule={activeModule} onModuleChange={setActiveModule}>
      {activeModule === 'Home' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-stitch-neutral-50">
          <div className="mb-8 p-4 bg-office-blue rounded-2xl text-white">
             <LayoutDashboard size={48} />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-office-blue">Asan Office</h1>
          <p className="text-xl text-stitch-neutral-600 mb-12 max-w-2xl">
            A high-performance, offline-first office suite running entirely in your browser.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {(['Word', 'Sheet', 'Slide', 'PDF'] as AppModule[]).map((mod) => (
              <button
                key={mod}
                onClick={() => setActiveModule(mod)}
                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all border border-stitch-neutral-200 text-left group flex flex-col items-start"
              >
                <div className={`p-3 rounded-lg mb-4 text-white transition-transform group-hover:scale-110 ${
                  mod === 'Word' ? 'bg-office-word' :
                  mod === 'Sheet' ? 'bg-office-sheet' :
                  mod === 'Slide' ? 'bg-office-slide' :
                  'bg-office-pdf'
                }`}>
                  {getModuleIcon(mod, 32)}
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-office-blue transition-colors">Asan {mod}</h2>
                <p className="text-sm text-stitch-neutral-500">Professional {mod.toLowerCase()} editing and management suite.</p>
              </button>
            ))}
          </div>

          <div className="mt-16 text-stitch-neutral-400 text-xs flex items-center space-x-4">
             <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2" /> Fully Offline</span>
             <span>•</span>
             <span>PWA Ready</span>
             <span>•</span>
             <span>Secure & Private</span>
          </div>
        </div>
      )}

      {activeModule === 'Word' && <WordModule />}
      {activeModule === 'Sheet' && <SheetModule />}
      {activeModule === 'Slide' && <SlideModule />}
      {activeModule === 'PDF' && <PdfModule />}

    </AppShell>
  )
}

export default App
