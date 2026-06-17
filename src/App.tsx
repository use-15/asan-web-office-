import { useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import { WordCanvas } from './modules/word/WordCanvas'

type AppModule = 'Word' | 'Sheet' | 'Slide' | 'PDF' | 'Home';

function App() {
  const [activeModule, setActiveModule] = useState<AppModule>('Home');

  return (
    <AppShell activeModule={activeModule} onModuleChange={setActiveModule}>
      {activeModule === 'Home' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#faf9f8]">
          <h1 className="text-4xl font-bold mb-4 text-office-blue">Welcome to Asan Office</h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl">
            A high-performance, offline-first office suite running entirely in your browser.
          </p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
            {(['Word', 'Sheet', 'Slide', 'PDF'] as AppModule[]).map((mod) => (
              <button
                key={mod}
                onClick={() => setActiveModule(mod)}
                className="p-8 bg-white rounded shadow-sm hover:shadow-md transition-all border border-slate-200 text-left group"
              >
                <div className={`w-12 h-1 mb-4 ${
                  mod === 'Word' ? 'bg-office-word' :
                  mod === 'Sheet' ? 'bg-office-sheet' :
                  mod === 'Slide' ? 'bg-office-slide' :
                  'bg-office-pdf'
                }`} />
                <h2 className="text-2xl font-bold mb-2 group-hover:text-office-blue transition-colors">Asan {mod}</h2>
                <p className="text-sm text-slate-500">Create, edit and manage {mod.toLowerCase()} documents offline.</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeModule !== 'Home' && (
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
           {/* Module Ribbon / Toolbar */}
           <div className="h-24 bg-[#f3f2f1] border-b border-slate-300 flex flex-col shrink-0">
              <div className="flex px-4 py-1 space-x-4 text-[10px] uppercase tracking-wider font-semibold">
                <span className="border-b-2 border-office-blue pb-1 cursor-pointer">File</span>
                <span className="opacity-40 cursor-pointer">Insert</span>
                <span className="opacity-40 cursor-pointer">Layout</span>
                <span className="opacity-40 cursor-pointer">Review</span>
              </div>
              <div className="flex-1 flex items-center px-4 space-x-4">
                 <div className="flex space-x-1 border-r border-slate-300 pr-4">
                    <button className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center font-bold">B</button>
                    <button className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center italic">I</button>
                    <button className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center underline">U</button>
                 </div>
                 <div className="flex items-center space-x-2">
                    <div className="w-32 h-8 bg-white border border-slate-300 rounded px-2 flex items-center text-xs text-slate-600">Arial</div>
                    <div className="w-12 h-8 bg-white border border-slate-300 rounded px-2 flex items-center text-xs text-slate-600">11</div>
                 </div>
              </div>
           </div>

           {/* Document Workspace */}
           <div className="flex-1 bg-[#dadad9] relative overflow-auto flex justify-center p-8">
              {activeModule === 'Word' ? (
                <WordCanvas />
              ) : (
                <div className="bg-white w-[816px] min-h-[1056px] shadow-lg relative flex flex-col p-16 items-center justify-center text-slate-300">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-2">Asan {activeModule} Module</p>
                      <p className="text-sm italic">Coming soon in the next sprint...</p>
                    </div>
                </div>
              )}
           </div>
        </div>
      )}
    </AppShell>
  )
}

export default App
