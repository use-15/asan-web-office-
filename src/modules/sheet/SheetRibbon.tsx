import React from 'react';
import { Ribbon, RibbonGroup, RibbonButton } from '../../components/ribbon/Ribbon';
import {
  Save, Table, BarChart3, Filter, Sigma,
  ArrowDownAZ, ArrowUpAZ, Grid3X3, Type
} from 'lucide-react';

interface SheetRibbonProps {
  grid: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSave: () => void;
}

export const SheetRibbon: React.FC<SheetRibbonProps> = ({ grid, activeTab, onTabChange, onSave }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'insert', label: 'Insert' },
    { id: 'formulas', label: 'Formulas' },
    { id: 'data', label: 'Data' },
  ];

  const handleAction = (action: string) => {
    console.log('Action:', action, 'on grid:', !!grid);
  };

  return (
    <Ribbon tabs={tabs} activeTab={activeTab} onTabChange={onTabChange}>
      {activeTab === 'home' && (
        <>
          <RibbonGroup label="File">
            <RibbonButton icon={<Save size={18} />} label="Save" onClick={onSave} />
          </RibbonGroup>
          <RibbonGroup label="Alignment">
            <RibbonButton icon={<Type size={18} />} label="Wrap Text" onClick={() => handleAction('wrap')} />
            <RibbonButton icon={<Grid3X3 size={18} />} label="Merge" onClick={() => handleAction('merge')} />
          </RibbonGroup>
        </>
      )}
      {activeTab === 'insert' && (
        <>
          <RibbonGroup label="Tables">
            <RibbonButton icon={<Table size={18} />} label="Table" onClick={() => handleAction('table')} />
          </RibbonGroup>
          <RibbonGroup label="Charts">
            <RibbonButton icon={<BarChart3 size={18} />} label="Charts" onClick={() => handleAction('chart')} />
          </RibbonGroup>
        </>
      )}
      {activeTab === 'formulas' && (
        <>
          <RibbonGroup label="Function Library">
            <RibbonButton icon={<Sigma size={18} />} label="AutoSum" onClick={() => handleAction('autosum')} />
          </RibbonGroup>
        </>
      )}
      {activeTab === 'data' && (
        <>
          <RibbonGroup label="Sort & Filter">
            <RibbonButton icon={<ArrowDownAZ size={18} />} label="Sort A-Z" onClick={() => handleAction('sort-az')} />
            <RibbonButton icon={<ArrowUpAZ size={18} />} label="Sort Z-A" onClick={() => handleAction('sort-za')} />
            <RibbonButton icon={<Filter size={18} />} label="Filter" onClick={() => handleAction('filter')} />
          </RibbonGroup>
        </>
      )}
    </Ribbon>
  );
};
