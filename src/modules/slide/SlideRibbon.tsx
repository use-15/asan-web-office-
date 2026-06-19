import React from 'react';
import { Ribbon, RibbonTabs, RibbonTab, RibbonContent, RibbonGroup, IconButton } from '../../components/ui/Ribbon';
import { FileText, Download } from 'lucide-react';
import { exportToPptx } from '../../core/utils/slide-io';

interface SlideRibbonProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  slides: any[];
}

export const SlideRibbon: React.FC<SlideRibbonProps> = ({ activeTab, setActiveTab, slides }) => {
  return (
    <Ribbon>
      <RibbonTabs>
        <RibbonTab label="File" active={activeTab === 'File'} onClick={() => setActiveTab('File')} colorClass="border-office-slide" />
        <RibbonTab label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} colorClass="border-office-slide" />
        <RibbonTab label="Insert" active={activeTab === 'Insert'} onClick={() => setActiveTab('Insert')} colorClass="border-office-slide" />
      </RibbonTabs>
      <RibbonContent>
        {activeTab === 'Home' && (
          <RibbonGroup label="Slides">
            <IconButton icon={<FileText size={20} />} label="New Slide" />
          </RibbonGroup>
        )}
        {activeTab === 'File' && (
          <RibbonGroup label="Export">
            <IconButton
              icon={<Download size={20} />}
              label="Download PPTX"
              onClick={() => exportToPptx(slides)}
            />
          </RibbonGroup>
        )}
      </RibbonContent>
    </Ribbon>
  );
};
