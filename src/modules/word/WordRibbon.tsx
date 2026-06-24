import React from 'react';
import { Ribbon, RibbonGroup, RibbonButton } from '../../components/ribbon/Ribbon';
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Save, FileText, Image as ImageIcon, Table, Hash, Type
} from 'lucide-react';

interface WordRibbonProps {
  editor: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSave: () => void;
}

export const WordRibbon: React.FC<WordRibbonProps> = ({ editor, activeTab, onTabChange, onSave }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'insert', label: 'Insert' },
    { id: 'layout', label: 'Layout' },
    { id: 'review', label: 'Review' },
  ];

  const execCommand = (command: string, value?: any) => {
    if (!editor) return;
    editor.command.execute(command, value);
  };

  return (
    <Ribbon tabs={tabs} activeTab={activeTab} onTabChange={onTabChange}>
      {activeTab === 'home' && (
        <>
          <RibbonGroup label="Clipboard">
            <RibbonButton icon={<Save size={18} />} label="Save" onClick={onSave} />
          </RibbonGroup>
          <RibbonGroup label="Font">
            <RibbonButton icon={<Bold size={18} />} label="Bold" onClick={() => execCommand('bold')} />
            <RibbonButton icon={<Italic size={18} />} label="Italic" onClick={() => execCommand('italic')} />
            <RibbonButton icon={<Underline size={18} />} label="Underline" onClick={() => execCommand('underline')} />
          </RibbonGroup>
          <RibbonGroup label="Paragraph">
            <RibbonButton icon={<AlignLeft size={18} />} label="Left" onClick={() => execCommand('alignLeft')} />
            <RibbonButton icon={<AlignCenter size={18} />} label="Center" onClick={() => execCommand('alignCenter')} />
            <RibbonButton icon={<AlignRight size={18} />} label="Right" onClick={() => execCommand('alignRight')} />
          </RibbonGroup>
        </>
      )}
      {activeTab === 'insert' && (
        <>
          <RibbonGroup label="Pages">
            <RibbonButton icon={<FileText size={18} />} label="Page Break" onClick={() => execCommand('pageBreak')} />
          </RibbonGroup>
          <RibbonGroup label="Tables">
            <RibbonButton icon={<Table size={18} />} label="Table" onClick={() => execCommand('table', { row: 3, col: 3 })} />
          </RibbonGroup>
          <RibbonGroup label="Illustrations">
            <RibbonButton icon={<ImageIcon size={18} />} label="Pictures" />
          </RibbonGroup>
        </>
      )}
      {activeTab === 'layout' && (
        <>
          <RibbonGroup label="Page Setup">
            <RibbonButton icon={<Hash size={18} />} label="Margins" />
            <RibbonButton icon={<Type size={18} />} label="Orientation" />
          </RibbonGroup>
        </>
      )}
    </Ribbon>
  );
};
