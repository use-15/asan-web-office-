import React from 'react';
import { Ribbon, RibbonTabs, RibbonTab, RibbonContent, RibbonGroup, IconButton } from '../../components/ui/Ribbon';
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Table as TableIcon, Image as ImageIcon, Type, Save, FileText, Download,
  Printer, Scissors, Copy, Clipboard
} from 'lucide-react';
import type { Editor } from '@hufe921/canvas-editor';
import { exportToDocx } from '../../core/utils/word-io';

interface WordRibbonProps {
  editor: Editor | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const WordRibbon: React.FC<WordRibbonProps> = ({ editor, activeTab, setActiveTab }) => {
  const executeCommand = (cmd: string, value?: any) => {
    if (!editor) return;
    switch(cmd) {
      case 'bold': editor.command.executeBold(); break;
      case 'italic': editor.command.executeItalic(); break;
      case 'underline': editor.command.executeUnderline(); break;
      case 'align-left': (editor.command as any).executeRowFlex('left'); break;
      case 'align-center': (editor.command as any).executeRowFlex('center'); break;
      case 'align-right': (editor.command as any).executeRowFlex('right'); break;
      case 'align-justify': (editor.command as any).executeRowFlex('justify'); break;
      case 'size': editor.command.executeSize(value); break;
      case 'table': editor.command.executeInsertTable(3, 3); break;
    }
  };

  return (
    <Ribbon>
      <RibbonTabs>
        <RibbonTab label="File" active={activeTab === 'File'} onClick={() => setActiveTab('File')} colorClass="border-office-word" />
        <RibbonTab label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} colorClass="border-office-word" />
        <RibbonTab label="Insert" active={activeTab === 'Insert'} onClick={() => setActiveTab('Insert')} colorClass="border-office-word" />
        <RibbonTab label="Layout" active={activeTab === 'Layout'} onClick={() => setActiveTab('Layout')} colorClass="border-office-word" />
      </RibbonTabs>

      <RibbonContent>
        {activeTab === 'Home' && (
          <>
            <RibbonGroup label="Clipboard">
              <IconButton icon={<Clipboard size={16} />} label="Paste" />
              <div className="flex flex-col space-y-1">
                <IconButton icon={<Scissors size={14} />} onClick={() => editor?.command.executeCut()} />
                <IconButton icon={<Copy size={14} />} onClick={() => editor?.command.executeCopy()} />
              </div>
            </RibbonGroup>
            <RibbonGroup label="Font">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                   <select className="text-[10px] border border-office-neutral-300 rounded px-1 h-5 w-24 bg-white outline-none">
                      <option>Arial</option>
                      <option>Calibri</option>
                      <option>Times New Roman</option>
                   </select>
                   <select className="text-[10px] border border-office-neutral-300 rounded px-1 h-5 w-10 bg-white outline-none" onChange={(e) => executeCommand('size', parseInt(e.target.value))}>
                      {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 36, 48, 72].map(s => <option key={s} value={s} selected={s===14}>{s}</option>)}
                   </select>
                </div>
                <div className="flex space-x-1">
                   <IconButton icon={<Bold size={14} />} onClick={() => executeCommand('bold')} />
                   <IconButton icon={<Italic size={14} />} onClick={() => executeCommand('italic')} />
                   <IconButton icon={<Underline size={14} />} onClick={() => executeCommand('underline')} />
                   <IconButton icon={<Type size={14} />} />
                </div>
              </div>
            </RibbonGroup>
            <RibbonGroup label="Paragraph">
              <div className="grid grid-cols-2 gap-1">
                <IconButton icon={<AlignLeft size={14} />} onClick={() => executeCommand('align-left')} />
                <IconButton icon={<AlignCenter size={14} />} onClick={() => executeCommand('align-center')} />
                <IconButton icon={<AlignRight size={14} />} onClick={() => executeCommand('align-right')} />
                <IconButton icon={<AlignJustify size={14} />} onClick={() => executeCommand('align-justify')} />
              </div>
            </RibbonGroup>
          </>
        )}
        {activeTab === 'Insert' && (
          <>
            <RibbonGroup label="Tables">
               <IconButton icon={<TableIcon size={20} />} label="Table" onClick={() => executeCommand('table')} />
            </RibbonGroup>
            <RibbonGroup label="Illustrations">
               <IconButton icon={<ImageIcon size={20} />} label="Pictures" />
            </RibbonGroup>
          </>
        )}
        {activeTab === 'File' && (
          <>
            <RibbonGroup label="Document">
               <IconButton icon={<Save size={20} />} label="Save" />
               <IconButton icon={<FileText size={20} />} label="New" />
            </RibbonGroup>
            <RibbonGroup label="Export">
               <IconButton
                  icon={<Download size={20} />}
                  label="Download DOCX"
                  onClick={() => editor && exportToDocx(editor)}
               />
               <IconButton icon={<Printer size={20} />} label="Print" />
            </RibbonGroup>
          </>
        )}
      </RibbonContent>
    </Ribbon>
  );
};
