import React, { useEffect, useRef, useState } from 'react';
import { Ribbon, RibbonGroup } from '../../components/ribbon/Ribbon';
import { Button } from '../../components/stitch/Button';
import {
  Bold, Italic, Type, Sigma, Filter,
  FilePlus, Save, FolderOpen
} from 'lucide-react';
import 'canvas-datagrid';
import { HyperFormula } from 'hyperformula';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// Extend HTMLDivElement to include the grid
interface GridElement extends HTMLDivElement {
  grid?: any;
}

export const SheetModule: React.FC = () => {
  const containerRef = useRef<GridElement>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [formulaValue, setFormulaValue] = useState('');
  const [selectedCell, setSelectedCell] = useState('A1');
  const hfRef = useRef<HyperFormula | null>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.grid) {
      // Initialize HyperFormula
      hfRef.current = HyperFormula.buildEmpty({
        licenseKey: 'gpl-v3',
      });

      // Initialize Canvas Datagrid
      const grid = (window as any).canvasDatagrid({
        parentNode: containerRef.current,
        data: Array.from({ length: 100 }, () => Array.from({ length: 26 }, () => '')),
        allowFreezingRows: true,
        allowFreezingColumns: true,
      });

      grid.style.height = '100%';
      grid.style.width = '100%';

      grid.addEventListener('click', (e: any) => {
        if (e.cell) {
          const col = String.fromCharCode(65 + e.cell.columnIndex);
          const row = e.cell.rowIndex + 1;
          setSelectedCell(`${col}${row}`);
          setFormulaValue(e.cell.value || '');
        }
      });

      containerRef.current.grid = grid;
    }
  }, []);

  const handleExport = async () => {
    const grid = containerRef.current?.grid;
    if (!grid) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    grid.data.forEach((row: any[]) => {
      worksheet.addRow(row);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'spreadsheet.xlsx');
  };

  const sheetRibbonTabs = [
    { id: 'home', label: 'Home' },
    { id: 'insert', label: 'Insert' },
    { id: 'formulas', label: 'Formulas' },
    { id: 'data', label: 'Data' },
  ];

  const renderHomeGroups = () => (
    <>
      <RibbonGroup label="Font">
        <div className="flex flex-col space-y-1">
          <div className="flex space-x-1">
             <Button variant="secondary" size="sm" className="w-8"><Bold size={14} /></Button>
             <Button variant="secondary" size="sm" className="w-8"><Italic size={14} /></Button>
             <Button variant="secondary" size="sm" className="w-8 border-b-4 border-office-sheet"><Type size={14} /></Button>
          </div>
        </div>
      </RibbonGroup>
      <RibbonGroup label="Editing">
        <div className="flex flex-col space-y-1">
           <Button variant="ghost" size="sm" className="justify-start text-[11px]"><Sigma size={14} className="mr-2"/> AutoSum</Button>
           <Button variant="ghost" size="sm" className="justify-start text-[11px]"><Filter size={14} className="mr-2"/> Sort & Filter</Button>
        </div>
      </RibbonGroup>
    </>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-stitch-neutral-50">
       <div className="bg-office-sheet text-white h-8 flex items-center px-4 space-x-4 shrink-0">
         <Button variant="action" size="sm"><FilePlus size={14} className="mr-2"/> New</Button>
         <Button variant="action" size="sm" onClick={handleExport}><Save size={14} className="mr-2"/> Save</Button>
         <Button variant="action" size="sm"><FolderOpen size={14} className="mr-2"/> Open</Button>
      </div>

      <Ribbon
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={sheetRibbonTabs}
        groups={activeTab === 'home' ? renderHomeGroups() : <div className="text-xs text-stitch-neutral-500">Formulas and Data tools coming soon...</div>}
        brandColor="var(--color-office-sheet)"
      />

      {/* Formula Bar */}
      <div className="h-9 border-b border-stitch-neutral-300 flex items-center px-2 bg-white space-x-2 shrink-0">
        <div className="w-16 text-xs text-center border-r border-stitch-neutral-300 font-semibold">{selectedCell}</div>
        <div className="italic text-office-sheet font-serif font-bold text-sm px-2">fx</div>
        <input
          type="text"
          value={formulaValue}
          onChange={(e) => setFormulaValue(e.target.value)}
          className="flex-1 h-full outline-none text-sm px-2"
          placeholder="Enter formula or value"
        />
      </div>

      <div className="flex-1 relative bg-stitch-neutral-200">
        <div ref={containerRef} className="absolute inset-0" />
      </div>
    </div>
  );
};
