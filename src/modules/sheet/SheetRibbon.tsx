import React from 'react';
import { Ribbon, RibbonTabs, RibbonTab, RibbonContent, RibbonGroup, IconButton } from '../../components/ui/Ribbon';
import { AlignLeft, AlignCenter, AlignRight, Download } from 'lucide-react';
import { exportToXlsx } from '../../core/utils/sheet-io';

interface SheetRibbonProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  data: any;
}

export const SheetRibbon: React.FC<SheetRibbonProps> = ({ activeTab, setActiveTab, data }) => {
  return (
    <Ribbon>
      <RibbonTabs>
        <RibbonTab label="File" active={activeTab === 'File'} onClick={() => setActiveTab('File')} colorClass="border-office-sheet" />
        <RibbonTab label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} colorClass="border-office-sheet" />
        <RibbonTab label="Insert" active={activeTab === 'Insert'} onClick={() => setActiveTab('Insert')} colorClass="border-office-sheet" />
      </RibbonTabs>
      <RibbonContent>
        {activeTab === 'Home' && (
          <>
            <RibbonGroup label="Alignment">
              <IconButton icon={<AlignLeft size={14} />} />
              <IconButton icon={<AlignCenter size={14} />} />
              <IconButton icon={<AlignRight size={14} />} />
            </RibbonGroup>
            <RibbonGroup label="Number">
              <div className="bg-white border border-office-neutral-300 px-2 py-0.5 rounded text-[10px]">General</div>
            </RibbonGroup>
          </>
        )}
        {activeTab === 'File' && (
          <RibbonGroup label="Export">
            <IconButton
              icon={<Download size={20} />}
              label="Download XLSX"
              onClick={() => exportToXlsx(data)}
            />
          </RibbonGroup>
        )}
      </RibbonContent>
    </Ribbon>
  );
};
