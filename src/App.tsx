import { useState, useCallback } from 'react'
import { AppShell } from './components/layout/AppShell'
import { WordCanvas } from './modules/word/WordCanvas'
import { WordRibbon } from './modules/word/WordRibbon'
import { SheetCanvas } from './modules/sheet/SheetCanvas'
import { SheetRibbon } from './modules/sheet/SheetRibbon'
import { SlideCanvas } from './modules/slide/SlideCanvas'
import { SlideRibbon } from './modules/slide/SlideRibbon'
import { PDFViewer } from './modules/pdf/PDFViewer'
import { Ribbon, RibbonTabs, RibbonTab, RibbonContent, RibbonGroup, IconButton } from './components/ui/Ribbon'
import { Type, Printer } from 'lucide-react'
import type { Editor } from '@hufe921/canvas-editor'

type AppModule = 'Word' | 'Sheet' | 'Slide' | 'PDF' | 'Home';

function App() {
  const [activeModule, setActiveModule] = useState<AppModule>('Home');
  const [wordEditor, setWordEditor] = useState<Editor | null>(null);
  const [sheetData, setSheetData] = useState<any>({});
  const [slideData, setSlideData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('Home');

  const handleWordEditorReady = useCallback((editor: Editor) => {
    setWordEditor(editor);
  }, []);

  const handleModuleChange = (mod: AppModule) => {
     setActiveModule(mod);
     setActiveTab('Home');
  };

  return (
    <AppShell activeModule={activeModule} onModuleChange={handleModuleChange}>
      {activeModule === 'Home' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-office-neutral-50">
          <h1 className="text-4xl font-bold mb-4 text-office-blue">Welcome to Asan Office</h1>
          <p className="text-xl text-office-neutral-700 mb-12 max-w-2xl">
            A high-performance, offline-first office suite running entirely in your browser.
          </p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
            {(['Word', 'Sheet', 'Slide', 'PDF'] as AppModule[]).map((mod) => (
              <button
                key={mod}
                onClick={() => handleModuleChange(mod)}
                className="p-8 bg-white rounded-sm shadow-stitch hover:bg-office-neutral-50 transition-all border border-office-neutral-200 text-left group"
              >
                <div className={`w-12 h-1 mb-4 ${
                  mod === 'Word' ? 'bg-office-word' :
                  mod === 'Sheet' ? 'bg-office-sheet' :
                  mod === 'Slide' ? 'bg-office-slide' :
                  'bg-office-pdf'
                }`} />
                <h2 className="text-2xl font-bold mb-2 group-hover:text-office-blue transition-colors">Asan {mod}</h2>
                <p className="text-sm text-office-neutral-500">Create, edit and manage {mod.toLowerCase()} documents offline.</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeModule !== 'Home' && (
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
           {activeModule === 'Word' && (
             <WordRibbon editor={wordEditor} activeTab={activeTab} setActiveTab={setActiveTab} />
           )}

           {activeModule === 'Sheet' && (
             <SheetRibbon activeTab={activeTab} setActiveTab={setActiveTab} data={sheetData} />
           )}

           {activeModule === 'Slide' && (
             <SlideRibbon activeTab={activeTab} setActiveTab={setActiveTab} slides={slideData} />
           )}

           {activeModule === 'PDF' && (
             <Ribbon>
               <RibbonTabs>
                 <RibbonTab label="File" active={activeTab === 'File'} onClick={() => setActiveTab('File')} colorClass="border-office-pdf" />
                 <RibbonTab label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} colorClass="border-office-pdf" />
                 <RibbonTab label="Review" active={activeTab === 'Review'} onClick={() => setActiveTab('Review')} colorClass="border-office-pdf" />
               </RibbonTabs>
               <RibbonContent>
                 {activeTab === 'Home' && (
                   <RibbonGroup label="View">
                      <IconButton icon={<Type size={20} />} label="Selection" />
                   </RibbonGroup>
                 )}
                 {activeTab === 'Review' && (
                   <RibbonGroup label="Markup">
                      <IconButton icon={<Printer size={20} />} label="Highlight" />
                   </RibbonGroup>
                 )}
               </RibbonContent>
             </Ribbon>
           )}

           {/* Document Workspace */}
           <div className="flex-1 bg-office-neutral-300 relative overflow-auto flex justify-center scrollbar-hide">
              {activeModule === 'Word' ? (
                <div className="p-8 flex justify-center w-full">
                  <WordCanvas onEditorReady={handleWordEditorReady} />
                </div>
              ) : activeModule === 'Sheet' ? (
                <div className="p-8 flex justify-center w-full">
                  <SheetCanvas onDataChange={setSheetData} />
                </div>
              ) : activeModule === 'Slide' ? (
                <SlideCanvas onSlidesChange={setSlideData} />
              ) : activeModule === 'PDF' ? (
                <PDFViewer />
              ) : (
                <div className="bg-white w-[816px] min-h-[1056px] shadow-stitch relative flex flex-col p-16 items-center justify-center text-office-neutral-300">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-2">Asan {activeModule} Module</p>
                      <p className="text-sm italic">Core engine is ready. UI integration in progress.</p>
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
