import React, { useEffect, useRef, useState } from 'react';
import Editor, { Command, type IElement } from '@hufe921/canvas-editor';
import { Ribbon, RibbonGroup } from '../../components/ribbon/Ribbon';
import { Button } from '../../components/stitch/Button';
import { Select } from '../../components/stitch/Select';
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Save, FolderOpen, FilePlus, Scissors, Copy, Type
} from 'lucide-react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export const WordModule: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('16');

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = new Editor(containerRef.current, [
        {
          value: 'Welcome to Asan Word\n',
          size: 24,
          bold: true,
          color: '#2b579a'
        },
        {
          value: 'Offline-first professional word processor.\n',
          size: 16,
          italic: true
        }
      ] as IElement[], {
        margins: [72, 72, 72, 72],
        watermark: {
          data: 'Asan Office',
          opacity: 0.1
        }
      } as any);
    }

    return () => {
      // editor cleanup if necessary
    };
  }, []);

  const execute = (command: keyof Command, payload?: any) => {
    if (editorRef.current) {
      (editorRef.current.command as any)[command](payload);
    }
  };

  const handleSave = async () => {
    if (!editorRef.current) return;
    const data = editorRef.current.command.getValue();

    // Simple docx export example
    const doc = new Document({
      sections: [{
        properties: {},
        children: data.data.main.map((el: any) => {
          return new Paragraph({
            children: [new TextRun({ text: el.value, bold: el.bold, italics: el.italic })],
          });
        }),
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "document.docx");
  };

  const handleNew = () => {
    if (editorRef.current) {
      editorRef.current.command.executeSetValue({
        main: []
      });
    }
  };

  const wordRibbonTabs = [
    { id: 'home', label: 'Home' },
    { id: 'insert', label: 'Insert' },
    { id: 'layout', label: 'Layout' },
    { id: 'view', label: 'View' },
  ];

  const renderHomeGroups = () => (
    <>
      <RibbonGroup label="Clipboard">
        <div className="grid grid-cols-2 gap-1">
          <Button variant="ghost" size="sm" onClick={() => execute('executeCut')} title="Cut"><Scissors size={14} /></Button>
          <Button variant="ghost" size="sm" onClick={() => execute('executeCopy')} title="Copy"><Copy size={14} /></Button>
        </div>
      </RibbonGroup>
      <RibbonGroup label="Font">
        <div className="flex flex-col space-y-1">
          <div className="flex space-x-1">
            <Select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                execute('executeFont', e.target.value);
              }}
              className="w-32"
            >
              <option>Arial</option>
              <option>Segoe UI</option>
              <option>Times New Roman</option>
              <option>Courier New</option>
            </Select>
            <Select
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                execute('executeSize', parseInt(e.target.value));
              }}
              className="w-16"
            >
              <option>12</option>
              <option>14</option>
              <option>16</option>
              <option>18</option>
              <option>20</option>
              <option>24</option>
              <option>28</option>
            </Select>
          </div>
          <div className="flex space-x-1">
            <Button variant="secondary" size="sm" onClick={() => execute('executeBold')} className="w-8"><Bold size={14} /></Button>
            <Button variant="secondary" size="sm" onClick={() => execute('executeItalic')} className="w-8"><Italic size={14} /></Button>
            <Button variant="secondary" size="sm" onClick={() => execute('executeUnderline')} className="w-8"><Underline size={14} /></Button>
            <div className="w-px h-4 bg-stitch-neutral-300 mx-1 align-middle self-center" />
            <Button variant="secondary" size="sm" onClick={() => execute('executeColor', '#ff0000')} className="w-8"><Type size={14} className="text-red-600" /></Button>
          </div>
        </div>
      </RibbonGroup>
      <RibbonGroup label="Paragraph">
        <div className="flex flex-col space-y-1">
           <div className="flex space-x-1">
              <Button variant="secondary" size="sm" onClick={() => (editorRef.current?.command as any).executeTextAlign('left')} className="w-8"><AlignLeft size={14} /></Button>
              <Button variant="secondary" size="sm" onClick={() => (editorRef.current?.command as any).executeTextAlign('center')} className="w-8"><AlignCenter size={14} /></Button>
              <Button variant="secondary" size="sm" onClick={() => (editorRef.current?.command as any).executeTextAlign('right')} className="w-8"><AlignRight size={14} /></Button>
              <Button variant="secondary" size="sm" onClick={() => (editorRef.current?.command as any).executeTextAlign('justify')} className="w-8"><AlignJustify size={14} /></Button>
           </div>
        </div>
      </RibbonGroup>
    </>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-stitch-neutral-50">
      <div className="bg-office-word text-white h-8 flex items-center px-4 space-x-4 shrink-0">
         <Button variant="action" size="sm" onClick={handleNew}><FilePlus size={14} className="mr-2"/> New</Button>
         <Button variant="action" size="sm" onClick={handleSave}><Save size={14} className="mr-2"/> Save</Button>
         <Button variant="action" size="sm"><FolderOpen size={14} className="mr-2"/> Open</Button>
      </div>

      <Ribbon
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={wordRibbonTabs}
        groups={activeTab === 'home' ? renderHomeGroups() : <div className="text-xs text-stitch-neutral-500">More tools coming soon...</div>}
        brandColor="var(--color-office-word)"
      />

      <div className="flex-1 overflow-auto bg-stitch-neutral-200 p-8 flex justify-center">
        <div
          ref={containerRef}
          className="bg-white shadow-xl min-h-[1056px] w-[816px]"
        />
      </div>
    </div>
  );
};
