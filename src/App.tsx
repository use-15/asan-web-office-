import { useState, useEffect, useCallback, useRef } from 'react'
import { AppShell } from './components/layout/AppShell'
import { Ribbon, RibbonGroup, RibbonButton } from './components/layout/Ribbon'
import { WordCanvas, type WordCanvasHandle } from './modules/word/WordCanvas'
import { SheetCanvas } from './modules/sheet/SheetCanvas'
import { SlideCanvas } from './modules/slide/SlideCanvas'
import { PDFCanvas } from './modules/pdf/PDFCanvas'
import { saveDocument } from './core/storage/db'
import { cn } from './lib/utils'
import {
  FilePlus, FolderOpen, Save,
  Search, Scissors, Copy, Clipboard as Paste, Type,
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Indent, Outdent, Highlighter, Type as FontColor,
  ChevronDown, Mic, CheckCircle2, Wand2, Eraser, Baseline
} from 'lucide-react'

type AppModule = 'Word' | 'Sheet' | 'Slide' | 'PDF' | 'Home';

function App() {
  const [activeModule, setActiveModule] = useState<AppModule>('Word');
  const [activeTab, setActiveTab] = useState('home');
  const wordRef = useRef<WordCanvasHandle>(null);
  const [, setLastSaved] = useState<number>(0);

  const handleSave = useCallback(async () => {
    if (activeModule === 'Home') return;
    const mockContent = { timestamp: Date.now(), data: "Engine state placeholder" };
    await saveDocument({
      id: `doc_${activeModule.toLowerCase()}`,
      name: `My ${activeModule} Document`,
      type: activeModule as 'Word' | 'Sheet' | 'Slide' | 'PDF',
      lastModified: Date.now(),
      content: mockContent
    });
    setLastSaved(Date.now());
  }, [activeModule]);

  useEffect(() => {
    if (activeModule === 'Home') return;
    const timer = setTimeout(() => {
      handleSave().catch(console.error);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeModule, handleSave]);

  const renderRibbon = () => {
    const tabs = [
      {
        id: 'file',
        label: 'File',
        content: (
          <div className="flex h-full">
             <RibbonGroup label="File">
                <RibbonButton icon={<FilePlus className="w-5 h-5" />} label="New" large />
                <RibbonButton icon={<FolderOpen className="w-5 h-5" />} label="Open" large />
                <RibbonButton icon={<Save className="w-5 h-5" />} label="Save" large onClick={handleSave} />
             </RibbonGroup>
          </div>
        )
      },
      {
        id: 'home',
        label: 'Home',
        content: (
          <div className="flex h-full">
            <RibbonGroup label="Clipboard">
              <RibbonButton icon={<Paste className="w-6 h-6" />} label="Paste" large />
              <div className="flex flex-col">
                <RibbonButton icon={<Scissors className="w-3.5 h-3.5" />} label="Cut" />
                <RibbonButton icon={<Copy className="w-3.5 h-3.5" />} label="Copy" />
                <RibbonButton icon={<Wand2 className="w-3.5 h-3.5" />} label="Format Painter" />
              </div>
            </RibbonGroup>

            <RibbonGroup label="Font">
               <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-1">
                     <div className="bg-white border border-[#edebe9] px-2 py-0.5 text-[11px] flex items-center min-w-[100px]">
                        Calibri (Body) <ChevronDown className="w-3 h-3 ml-auto opacity-60" />
                     </div>
                     <div className="bg-white border border-[#edebe9] px-2 py-0.5 text-[11px] flex items-center min-w-[40px]">
                        11 <ChevronDown className="w-3 h-3 ml-auto opacity-60" />
                     </div>
                     <div className="flex items-center">
                        <RibbonButton icon={<Baseline className="w-3.5 h-3.5" />} label="" />
                        <RibbonButton icon={<Baseline className="w-2.5 h-2.5" />} label="" />
                        <div className="w-px h-4 bg-[#edebe9] mx-1" />
                        <RibbonButton icon={<Eraser className="w-3.5 h-3.5" />} label="" />
                     </div>
                  </div>
                  <div className="flex items-center">
                     <RibbonButton icon={<Bold className="w-3.5 h-3.5" />} label="" onClick={() => wordRef.current?.command('bold')} />
                     <RibbonButton icon={<Italic className="w-3.5 h-3.5" />} label="" onClick={() => wordRef.current?.command('italic')} />
                     <RibbonButton icon={<Underline className="w-3.5 h-3.5" />} label="" onClick={() => wordRef.current?.command('underline')} />
                     <RibbonButton icon={<Strikethrough className="w-3.5 h-3.5" />} label="" />
                     <div className="w-px h-4 bg-[#edebe9] mx-1" />
                     <RibbonButton icon={<Highlighter className="w-3.5 h-3.5" />} label="" />
                     <RibbonButton icon={<FontColor className="w-3.5 h-3.5" />} label="" />
                  </div>
               </div>
            </RibbonGroup>

            <RibbonGroup label="Paragraph">
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                        <List className="w-3.5 h-3.5" />
                        <ListOrdered className="w-3.5 h-3.5 ml-2" />
                        <div className="w-px h-4 bg-[#edebe9] mx-2" />
                        <Outdent className="w-3.5 h-3.5" />
                        <Indent className="w-3.5 h-3.5 ml-2" />
                    </div>
                    <div className="flex items-center">
                        <AlignLeft className="w-3.5 h-3.5" />
                        <AlignCenter className="w-3.5 h-3.5 ml-2" />
                        <AlignRight className="w-3.5 h-3.5 ml-2" />
                        <AlignJustify className="w-3.5 h-3.5 ml-2" />
                    </div>
                </div>
            </RibbonGroup>

            <RibbonGroup label="Styles">
               <div className="flex items-center space-x-1">
                  <div className="w-20 h-12 bg-white border border-[#edebe9] flex flex-col items-center justify-center rounded-sm cursor-pointer hover:bg-slate-50">
                     <span className="text-blue-600 font-bold text-sm">AaBbCc</span>
                     <span className="text-[9px]">Normal</span>
                  </div>
                  <div className="w-20 h-12 bg-white border border-[#edebe9] flex flex-col items-center justify-center rounded-sm cursor-pointer hover:bg-slate-50">
                     <span className="font-bold text-sm">AaBbCc</span>
                     <span className="text-[9px]">No Spacing</span>
                  </div>
                  <ChevronDown className="w-4 h-4 opacity-40 cursor-pointer" />
               </div>
            </RibbonGroup>

            <RibbonGroup label="Editing">
               <div className="flex flex-col">
                  <div className="flex items-center px-2 py-0.5 hover:bg-slate-100 cursor-pointer text-xs">
                     <Search className="w-3.5 h-3.5 mr-2" /> Find
                  </div>
                  <div className="flex items-center px-2 py-0.5 hover:bg-slate-100 cursor-pointer text-xs">
                     <Type className="w-3.5 h-3.5 mr-2" /> Replace
                  </div>
               </div>
            </RibbonGroup>

            <RibbonGroup label="Voice">
                <RibbonButton icon={<Mic className="w-6 h-6 text-[#2b579a]" />} label="Dictate" large />
            </RibbonGroup>

            <RibbonGroup label="Editor">
                <RibbonButton icon={<CheckCircle2 className="w-6 h-6 text-blue-500" />} label="Editor" large />
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
    >
      {activeModule === 'Home' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#faf9f8]">
          <h1 className="text-5xl font-extrabold mb-4 text-[#005a9e] tracking-tight">Asan Office</h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl font-light">Professional productivity suite.</p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
            {(['Word', 'Sheet', 'Slide', 'PDF'] as AppModule[]).map((mod) => (
              <button
                key={mod}
                onClick={() => setActiveModule(mod)}
                className="p-8 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all border border-slate-200 text-left group relative overflow-hidden"
              >
                <div className={cn(
                  "absolute top-0 left-0 w-1.5 h-full transition-all group-hover:w-3",
                  mod === 'Word' ? 'bg-[#2b579a]' : mod === 'Sheet' ? 'bg-[#217346]' : mod === 'Slide' ? 'bg-[#d24726]' : 'bg-[#b30b00]'
                )} />
                <h2 className="text-2xl font-bold group-hover:translate-x-1 transition-transform">Asan {mod}</h2>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeModule !== 'Home' && (
        <div className="flex-1 overflow-hidden">
           {activeModule === 'Word' ? (
             <WordCanvas ref={wordRef} />
           ) : activeModule === 'Sheet' ? (
             <SheetCanvas />
           ) : activeModule === 'Slide' ? (
             <SlideCanvas />
           ) : (
             <PDFCanvas />
           )}
        </div>
      )}
    </AppShell>
  )
}

export default App
