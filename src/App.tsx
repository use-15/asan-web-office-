import { useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import { WordCanvas } from './modules/word/WordCanvas'
import { WordRibbon } from './modules/word/WordRibbon'
import { exportToDocx } from './modules/word/wordUtils'
import { SheetCanvas } from './modules/sheet/SheetCanvas'
import { SheetRibbon } from './modules/sheet/SheetRibbon'
import { exportToXlsx } from './modules/sheet/sheetUtils'
import { SlideCanvas } from './modules/slide/SlideCanvas'
import type { Slide } from './modules/slide/SlideCanvas'
import { SlideRibbon } from './modules/slide/SlideRibbon'
import { exportToPptx } from './modules/slide/slideUtils'
import { PDFViewer } from './modules/pdf/PDFViewer'
import { FileText, Table as TableIcon, Presentation, FileDigit, Plus, Clock, Star } from 'lucide-react'

type AppModule = 'Word' | 'Sheet' | 'Slide' | 'PDF' | 'Home';

function App() {
  const [activeModule, setActiveModule] = useState<AppModule>('Home');
  const [wordEditor, setWordEditor] = useState<any>(null);
  const [wordTab, setWordTab] = useState('home');
  const [sheetGrid, setSheetGrid] = useState<any>(null);
  const [sheetTab, setSheetTab] = useState('home');
  const [slideTab, setSlideTab] = useState('home');
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: '1',
      elements: [
        { id: 'el1', type: 'text', value: 'Welcome to Asan Slide', x: 100, y: 100, width: 400, height: 50, fontSize: 48 }
      ]
    }
  ]);
  const [currentSlideIndex] = useState(0);

  const handleUpdateSlideElement = (slideIdx: number, elementId: string, updates: any) => {
    setSlides(prev => {
      const newSlides = [...prev];
      const slide = { ...newSlides[slideIdx] };
      slide.elements = slide.elements.map(el => el.id === elementId ? { ...el, ...updates } : el);
      newSlides[slideIdx] = slide;
      return newSlides;
    });
  };

  return (
    <AppShell activeModule={activeModule} onModuleChange={setActiveModule}>
      {activeModule === 'Home' && (
        <div className="flex-1 flex flex-col bg-office-neutral-10 overflow-auto">
          {/* Hero Section */}
          <div className="bg-white px-12 py-12 border-b border-office-neutral-30">
            <h1 className="text-3xl font-bold mb-8 text-office-neutral-160">Good morning</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveModule('Word')}
                className="flex flex-col items-center p-6 bg-white border border-office-neutral-40 rounded-sm hover:shadow-stitch-md transition-all min-w-[140px] group"
              >
                <div className="w-12 h-12 bg-office-word rounded-sm flex items-center justify-center mb-4 text-white shadow-sm group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <span className="text-sm font-semibold">Word</span>
              </button>
              <button
                onClick={() => setActiveModule('Sheet')}
                className="flex flex-col items-center p-6 bg-white border border-office-neutral-40 rounded-sm hover:shadow-stitch-md transition-all min-w-[140px] group"
              >
                <div className="w-12 h-12 bg-office-sheet rounded-sm flex items-center justify-center mb-4 text-white shadow-sm group-hover:scale-110 transition-transform">
                  <TableIcon size={24} />
                </div>
                <span className="text-sm font-semibold">Excel</span>
              </button>
              <button
                onClick={() => setActiveModule('Slide')}
                className="flex flex-col items-center p-6 bg-white border border-office-neutral-40 rounded-sm hover:shadow-stitch-md transition-all min-w-[140px] group"
              >
                <div className="w-12 h-12 bg-office-slide rounded-sm flex items-center justify-center mb-4 text-white shadow-sm group-hover:scale-110 transition-transform">
                  <Presentation size={24} />
                </div>
                <span className="text-sm font-semibold">PowerPoint</span>
              </button>
              <button
                onClick={() => setActiveModule('PDF')}
                className="flex flex-col items-center p-6 bg-white border border-office-neutral-40 rounded-sm hover:shadow-stitch-md transition-all min-w-[140px] group"
              >
                <div className="w-12 h-12 bg-office-pdf rounded-sm flex items-center justify-center mb-4 text-white shadow-sm group-hover:scale-110 transition-transform">
                  <FileDigit size={24} />
                </div>
                <span className="text-sm font-semibold">PDF</span>
              </button>
              <div className="flex flex-col items-center p-6 bg-office-neutral-20 border border-dashed border-office-neutral-40 rounded-sm min-w-[140px] justify-center opacity-60">
                <Plus size={24} className="mb-2" />
                <span className="text-sm font-semibold">Create New</span>
              </div>
            </div>
          </div>

          {/* Recent Documents Section */}
          <div className="px-12 py-10 max-w-6xl w-full mx-auto">
            <div className="flex items-center mb-6 space-x-8 border-b border-office-neutral-30 pb-2">
               <button className="flex items-center text-sm font-bold border-b-2 border-office-blue pb-2">
                 <Clock size={16} className="mr-2" /> Recent
               </button>
               <button className="flex items-center text-sm font-medium text-office-neutral-100 hover:text-office-neutral-160 transition-colors pb-2">
                 <Star size={16} className="mr-2" /> Pinned
               </button>
            </div>

            <div className="bg-white rounded-sm border border-office-neutral-30 shadow-stitch-sm overflow-hidden">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-office-neutral-20 text-[11px] uppercase tracking-wider text-office-neutral-100">
                     <th className="px-6 py-3 font-semibold">Name</th>
                     <th className="px-6 py-3 font-semibold">Modified</th>
                     <th className="px-6 py-3 font-semibold">Owner</th>
                     <th className="px-6 py-3 font-semibold">Location</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm divide-y divide-office-neutral-30">
                   <tr className="hover:bg-office-neutral-20 cursor-pointer transition-colors group">
                     <td className="px-6 py-4 flex items-center font-medium">
                       <div className="w-8 h-8 bg-office-word/10 rounded-sm flex items-center justify-center mr-3 text-office-word">
                         <FileText size={16} />
                       </div>
                       Project Proposal.docx
                     </td>
                     <td className="px-6 py-4 text-office-neutral-100 italic">2 hours ago</td>
                     <td className="px-6 py-4">You</td>
                     <td className="px-6 py-4 text-office-neutral-100">Documents</td>
                   </tr>
                   <tr className="hover:bg-office-neutral-20 cursor-pointer transition-colors group">
                     <td className="px-6 py-4 flex items-center font-medium">
                       <div className="w-8 h-8 bg-office-sheet/10 rounded-sm flex items-center justify-center mr-3 text-office-sheet">
                         <TableIcon size={16} />
                       </div>
                       Q4 Financials.xlsx
                     </td>
                     <td className="px-6 py-4 text-office-neutral-100 italic">Yesterday</td>
                     <td className="px-6 py-4">You</td>
                     <td className="px-6 py-4 text-office-neutral-100">Finance</td>
                   </tr>
                   <tr className="hover:bg-office-neutral-20 cursor-pointer transition-colors group">
                     <td className="px-6 py-4 flex items-center font-medium">
                       <div className="w-8 h-8 bg-office-slide/10 rounded-sm flex items-center justify-center mr-3 text-office-slide">
                         <Presentation size={16} />
                       </div>
                       Annual Strategy.pptx
                     </td>
                     <td className="px-6 py-4 text-office-neutral-100 italic">3 days ago</td>
                     <td className="px-6 py-4">Marketing</td>
                     <td className="px-6 py-4 text-office-neutral-100">Cloud Storage</td>
                   </tr>
                 </tbody>
               </table>
               <div className="p-4 bg-office-neutral-20 text-center">
                 <button className="text-office-blue text-xs font-semibold hover:underline">Show all files</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeModule === 'Word' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <WordRibbon
            editor={wordEditor}
            activeTab={wordTab}
            onTabChange={setWordTab}
            onSave={() => exportToDocx(wordEditor)}
          />
          <WordCanvas onEditorReady={setWordEditor} />
        </div>
      )}

      {activeModule === 'Sheet' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <SheetRibbon
            grid={sheetGrid}
            activeTab={sheetTab}
            onTabChange={setSheetTab}
            onSave={() => exportToXlsx(sheetGrid)}
          />
          <SheetCanvas onGridReady={setSheetGrid} />
        </div>
      )}

      {activeModule === 'Slide' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <SlideRibbon
            activeTab={slideTab}
            onTabChange={setSlideTab}
            onSave={() => exportToPptx(slides)}
            onStartShow={() => console.log('Starting slideshow...')}
          />
          <SlideCanvas
            slides={slides}
            currentSlideIndex={currentSlideIndex}
            onUpdateElement={handleUpdateSlideElement}
          />
        </div>
      )}

      {activeModule === 'PDF' && <PDFViewer />}

      {activeModule !== 'Home' && activeModule !== 'Word' && activeModule !== 'Sheet' && activeModule !== 'Slide' && activeModule !== 'PDF' && (
        <div className="flex-1 flex flex-col bg-white overflow-hidden items-center justify-center">
           <p className="text-xl font-bold">Unknown Module</p>
        </div>
      )}
    </AppShell>
  )
}

export default App
