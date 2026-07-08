import React, { useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Ribbon, RibbonGroup } from '../../components/ribbon/Ribbon';
import { Button } from '../../components/stitch/Button';
import {
  FileText, Search, ZoomIn, ZoomOut, RotateCw,
  PenTool, Highlighter, MousePointer2, FolderOpen
} from 'lucide-react';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PdfModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [zoom, setZoom] = useState(100);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: zoom / 100 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          canvas.className = "mb-8 shadow-lg bg-white mx-auto block";

          await page.render({ canvasContext: context!, viewport } as any).promise;
          containerRef.current.appendChild(canvas);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const pdfRibbonTabs = [
    { id: 'home', label: 'Home' },
    { id: 'edit', label: 'Edit' },
    { id: 'view', label: 'View' },
    { id: 'secure', label: 'Secure' },
  ];

  const renderHomeGroups = () => (
    <>
      <RibbonGroup label="Selection">
         <Button variant="secondary" size="sm" className="w-8"><MousePointer2 size={14} /></Button>
         <Button variant="secondary" size="sm" className="w-8"><Search size={14} /></Button>
      </RibbonGroup>
      <RibbonGroup label="View">
         <div className="flex space-x-2 items-center">
            <Button variant="secondary" size="sm" onClick={() => setZoom(z => Math.max(25, z - 25))}><ZoomOut size={14} /></Button>
            <span className="text-xs w-12 text-center font-semibold">{zoom}%</span>
            <Button variant="secondary" size="sm" onClick={() => setZoom(z => Math.min(400, z + 25))}><ZoomIn size={14} /></Button>
            <div className="w-px h-4 bg-stitch-neutral-300 mx-1" />
            <Button variant="secondary" size="sm"><RotateCw size={14} /></Button>
         </div>
      </RibbonGroup>
      <RibbonGroup label="Annotate">
         <div className="flex space-x-1">
            <Button variant="secondary" size="sm" className="w-8"><Highlighter size={14} /></Button>
            <Button variant="secondary" size="sm" className="w-8"><PenTool size={14} /></Button>
         </div>
      </RibbonGroup>
    </>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-stitch-neutral-50">
       <div className="bg-office-pdf text-white h-8 flex items-center px-4 space-x-4 shrink-0">
         <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={onFileChange} />
         <Button variant="action" size="sm" onClick={handleOpen}><FolderOpen size={14} className="mr-2"/> Open</Button>
      </div>

      <Ribbon
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={pdfRibbonTabs}
        groups={activeTab === 'home' ? renderHomeGroups() : <div className="text-xs text-stitch-neutral-500">PDF editing and security tools coming soon...</div>}
        brandColor="var(--color-office-pdf)"
      />

      <div className="flex-1 bg-stitch-neutral-200 overflow-auto p-8" ref={containerRef}>
         <div className="flex flex-col items-center justify-center h-full text-stitch-neutral-400">
            <FileText size={64} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">Select a PDF file to start viewing</p>
            <Button variant="secondary" className="mt-4" onClick={handleOpen}>Open Document</Button>
         </div>
      </div>
    </div>
  );
};
