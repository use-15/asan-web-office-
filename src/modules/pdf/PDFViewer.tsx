import React, { useRef, useEffect, useState } from 'react';
import { saveDocumentMetadata } from '../../core/storage/db'
import { FileText, Upload } from 'lucide-react'

export const PDFViewer: React.FC<{documentId?: string}> = ({ documentId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [fileName, setFileName] = useState<string>('Document.pdf');
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    const id = documentId || 'unsaved_pdf';
    saveDocumentMetadata({
       id,
       name: fileName,
       type: 'PDF',
       lastModified: Date.now()
    });

    renderPage();
  }, [documentId, fileName]);

  const renderPage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simulate PDF Rendering
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#333333';
    ctx.font = 'bold 24px Segoe UI';
    ctx.fillText(fileName, 100, 100);

    ctx.font = '14px Segoe UI';
    ctx.fillText(`Page 1 of ${numPages}`, 100, 140);

    // Draw dummy document structure
    ctx.fillStyle = '#f3f2f1';
    for (let i = 0; i < 20; i++) {
       const w = 400 + Math.random() * 200;
       ctx.fillRect(100, 180 + i * 30, w, 15);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setNumPages(Math.floor(Math.random() * 10) + 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
     const canvas = overlayRef.current;
     if (!canvas) return;
     const ctx = canvas.getContext('2d');
     if (!ctx) return;

     const rect = canvas.getBoundingClientRect();
     const x = e.clientX - rect.left;
     const y = e.clientY - rect.top;

     ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
     ctx.fillRect(x - 50, y - 10, 100, 20);
  };

  return (
    <div className="bg-office-neutral-300 flex-1 flex flex-col items-center overflow-auto p-8 relative">
      <div className="mb-4 bg-white p-4 rounded shadow-sm border border-office-neutral-300 w-full max-w-4xl flex items-center justify-between">
         <div className="flex items-center space-x-2">
            <FileText className="text-office-pdf" size={24} />
            <span className="font-semibold">{fileName}</span>
         </div>
         <label className="flex items-center space-x-2 bg-office-pdf text-white px-4 py-2 rounded cursor-pointer hover:bg-office-pdf-dark transition-colors text-xs font-bold">
            <Upload size={16} />
            <span>Upload PDF</span>
            <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
         </label>
      </div>

      <div className="relative shadow-stitch">
        <canvas
          ref={canvasRef}
          width={816}
          height={1056}
          className="bg-white"
        />
        <canvas
           ref={overlayRef}
           width={816}
           height={1056}
           onMouseDown={handleMouseDown}
           className="absolute top-0 left-0 cursor-crosshair"
        />
      </div>
    </div>
  );
};
