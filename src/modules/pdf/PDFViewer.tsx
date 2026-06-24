import React, { useState } from 'react';
import { Ribbon, RibbonGroup, RibbonButton } from '../../components/ribbon/Ribbon';
import {
  FileText, ZoomIn, ZoomOut, RotateCw,
  Search, Shield, Edit, Download
} from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

export const PDFViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'view', label: 'View' },
    { id: 'edit', label: 'Edit' },
    { id: 'protect', label: 'Protect' },
  ];

  const handleExport = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText('Asan PDF Export', {
      x: 50,
      y: 350,
      size: 30,
      color: rgb(0, 0.35, 0.62),
    });

    const pdfBytes = await pdfDoc.save();
    // @ts-ignore
    saveAs(new Blob([pdfBytes]), "document.pdf");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-office-neutral-30">
      <Ribbon tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'home' && (
          <>
            <RibbonGroup label="File">
              <RibbonButton icon={<Download size={18} />} label="Export" onClick={handleExport} />
            </RibbonGroup>
            <RibbonGroup label="Navigation">
              <RibbonButton icon={<FileText size={18} />} label="Thumbnails" />
              <RibbonButton icon={<Search size={18} />} label="Find" />
            </RibbonGroup>
          </>
        )}
        {activeTab === 'view' && (
          <>
            <RibbonGroup label="Zoom">
              <RibbonButton icon={<ZoomIn size={18} />} label="Zoom In" />
              <RibbonButton icon={<ZoomOut size={18} />} label="Zoom Out" />
            </RibbonGroup>
            <RibbonGroup label="Page View">
              <RibbonButton icon={<RotateCw size={18} />} label="Rotate" />
            </RibbonGroup>
          </>
        )}
        {activeTab === 'edit' && (
          <>
            <RibbonGroup label="Content">
              <RibbonButton icon={<Edit size={18} />} label="Edit Text" />
            </RibbonGroup>
          </>
        )}
        {activeTab === 'protect' && (
          <>
            <RibbonGroup label="Security">
              <RibbonButton icon={<Shield size={18} />} label="Password" />
            </RibbonGroup>
          </>
        )}
      </Ribbon>

      <div className="flex-1 overflow-auto flex justify-center p-8">
        <div className="bg-white shadow-stitch-lg w-[816px] h-[1056px] flex items-center justify-center text-office-neutral-100 flex-col">
           <FileText size={64} className="mb-4 opacity-20" />
           <p className="text-xl font-semibold">PDF Viewer / Editor Surface</p>
           <p className="text-sm">Asan PDF Module Active</p>
        </div>
      </div>
    </div>
  );
};
