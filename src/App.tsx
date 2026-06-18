import { useState, useEffect, useCallback, useRef } from 'react'
import { AppShell } from './components/layout/AppShell'
import { Ribbon, RibbonGroup, RibbonButton } from './components/layout/Ribbon'
import { Toolbar } from './components/layout/Toolbar'
import { WordCanvas, type WordCanvasHandle } from './modules/word/WordCanvas'
import { SheetCanvas } from './modules/sheet/SheetCanvas'
import { SlideCanvas } from './modules/slide/SlideCanvas'
import { PDFCanvas } from './modules/pdf/PDFCanvas'
import { saveDocument } from './core/storage/db'
import { cn } from './lib/utils'
import { FileText, Table, Presentation, FileCode, Save, FilePlus, FolderOpen, Share2, Printer, Search, Scissors, Copy, Clipboard as Paste, Type } from 'lucide-react'

type AppModule = 'Word' | 'Sheet' | 'Slide' | 'PDF' | 'Home';

function App() {
  const [activeModule, setActiveModule] = useState<AppModule>('Home');
  const [activeTab, setActiveTab] = useState('home');
  const wordRef = useRef<WordCanvasHandle>(null);
  const [, setLastSaved] = useState<number>(0);

  const handleSave = useCallback(async () => {
    if (activeModule === 'Home') return;

    // In a real implementation, we'd grab the state from the active engine
    const mockContent = { timestamp: Date.now(), data: "Engine state placeholder" };

    await saveDocument({
      id: `doc_${activeModule.toLowerCase()}`,
      name: `My ${activeModule} Document`,
      type: activeModule as 'Word' | 'Sheet' | 'Slide' | 'PDF',
      lastModified: Date.now(),
      content: mockContent
    });
    setLastSaved(Date.now());
    console.log(`Auto-saved Asan ${activeModule}`);
  }, [activeModule]);

  // Debounced Auto-save effect
  useEffect(() => {
    if (activeModule === 'Home') return;

    const timer = setTimeout(() => {
      handleSave().catch(console.error);
    }, 5000); // Auto-save every 5 seconds if active

    return () => clearTimeout(timer);
  }, [activeModule, handleSave]);

  const renderRibbon = () => {
    const commonFileGroup = (
      <RibbonGroup label="File">
        <RibbonButton icon={<FilePlus className="w-5 h-5" />} label="New" large />
        <RibbonButton icon={<FolderOpen className="w-5 h-5" />} label="Open" large />
        <RibbonButton icon={<Save className="w-5 h-5" />} label="Save" large onClick={handleSave} />
        <RibbonButton icon={<FileText className="w-5 h-5" />} label="Export" large onClick={() => wordRef.current?.exportDocx()} />
      </RibbonGroup>
    );

    const commonClipboardGroup = (
      <RibbonGroup label="Clipboard">
        <RibbonButton icon={<Paste className="w-5 h-5" />} label="Paste" large />
        <div className="flex flex-col space-y-1">
          <RibbonButton icon={<Scissors className="w-3 h-3" />} label="Cut" />
          <RibbonButton icon={<Copy className="w-3 h-3" />} label="Copy" />
        </div>
      </RibbonGroup>
    );

    const tabs = [
      {
        id: 'file',
        label: 'File',
        content: (
          <div className="flex h-full">
            {commonFileGroup}
            <RibbonGroup label="Share">
              <RibbonButton icon={<Share2 className="w-5 h-5" />} label="Share" large />
              <RibbonButton icon={<Printer className="w-5 h-5" />} label="Print" large />
            </RibbonGroup>
          </div>
        )
      },
      {
        id: 'home',
        label: 'Home',
        content: (
          <div className="flex h-full">
            {commonClipboardGroup}
            <RibbonGroup label="Editing">
              <RibbonButton icon={<Search className="w-5 h-5" />} label="Find" />
              <RibbonButton icon={<Type className="w-5 h-5" />} label="Replace" />
            </RibbonGroup>
          </div>
        )
      },
      {
        id: 'insert',
        label: 'Insert',
        content: (
          <div className="flex h-full">
             <RibbonGroup label="Pages">
                <RibbonButton icon={<FileText className="w-5 h-5" />} label="Blank Page" large />
             </RibbonGroup>
             <RibbonGroup label="Tables">
                <RibbonButton icon={<Table className="w-5 h-5" />} label="Table" large />
             </RibbonGroup>
          </div>
        )
      }
    ];

    return <Ribbon tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />;
  };

  return (
    <AppShell
      activeModule={activeModule}
      onModuleChange={setActiveModule}
      ribbon={renderRibbon()}
      toolbar={<Toolbar onCommand={(type, val) => wordRef.current?.command(type, val)} />}
    >
      {activeModule === 'Home' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#faf9f8]">
          <h1 className="text-5xl font-extrabold mb-4 text-[#005a9e] tracking-tight">Asan Office</h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl font-light">
            High-performance, offline-first productivity suite.
          </p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
            {(['Word', 'Sheet', 'Slide', 'PDF'] as AppModule[]).map((mod) => (
              <button
                key={mod}
                onClick={() => setActiveModule(mod)}
                className="p-8 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all border border-slate-200 text-left group relative overflow-hidden"
              >
                <div className={cn(
                  "absolute top-0 left-0 w-1.5 h-full transition-all group-hover:w-3",
                  mod === 'Word' ? 'bg-[#2b579a]' :
                  mod === 'Sheet' ? 'bg-[#217346]' :
                  mod === 'Slide' ? 'bg-[#d24726]' :
                  'bg-[#b30b00]'
                )} />
                <div className="flex items-center mb-4">
                  {mod === 'Word' && <FileText className="w-8 h-8 text-[#2b579a] mr-3" />}
                  {mod === 'Sheet' && <Table className="w-8 h-8 text-[#217346] mr-3" />}
                  {mod === 'Slide' && <Presentation className="w-8 h-8 text-[#d24726] mr-3" />}
                  {mod === 'PDF' && <FileCode className="w-8 h-8 text-[#b30b00] mr-3" />}
                  <h2 className="text-2xl font-bold group-hover:translate-x-1 transition-transform">Asan {mod}</h2>
                </div>
                <p className="text-sm text-slate-500 font-medium">Professional {mod.toLowerCase()} document processing.</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeModule !== 'Home' && (
        <div className="flex-1 overflow-auto flex justify-center p-8">
           {activeModule === 'Word' ? (
             <WordCanvas ref={wordRef} />
           ) : activeModule === 'Sheet' ? (
             <SheetCanvas />
           ) : activeModule === 'Slide' ? (
             <SlideCanvas />
           ) : activeModule === 'PDF' ? (
             <PDFCanvas />
           ) : (
             <div className="bg-white w-[816px] min-h-[1056px] shadow-2xl relative flex flex-col p-16 items-center justify-center text-slate-400 border border-[#edebe9]">
                 <div className="text-center animate-pulse">
                   <p className="text-3xl font-bold mb-4">Asan {activeModule}</p>
                   <p className="text-sm uppercase tracking-widest font-semibold">Engine Initializing...</p>
                 </div>
             </div>
           )}
        </div>
      )}
    </AppShell>
  )
}

export default App
