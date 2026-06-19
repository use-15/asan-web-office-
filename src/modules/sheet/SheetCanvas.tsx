import React, { useRef, useEffect, useState, useCallback } from 'react';
import { saveToOPFS } from '../../core/storage/opfs'
import { saveDocumentMetadata } from '../../core/storage/db'
import { FormulaParser } from '../../core/engine/formula'

interface CellData {
  value: string;
  formula?: string;
  style?: React.CSSProperties;
}

interface SheetCanvasProps {
  onCellSelect?: (row: number, col: number, value: string) => void;
  onDataChange?: (data: Record<string, CellData>) => void;
  documentId?: string;
}

export const SheetCanvas: React.FC<SheetCanvasProps> = ({ onCellSelect, onDataChange, documentId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<Record<string, CellData>>({});
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>({row: 0, col: 0});
  const [editingCell, setEditingCell] = useState<{row: number, col: number, value: string} | null>(null);

  const ROW_HEIGHT = 24;
  const COL_WIDTH = 100;
  const HEADER_SIZE = 30;
  const ROWS = 100;
  const COLS = 26;

  const getCellId = (r: number, c: number) => `${String.fromCharCode(65 + c)}${r + 1}`;

  const formulaParser = useRef(new FormulaParser((id) => data[id]?.value || '0'));

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12px Segoe UI, sans-serif';

    // Draw Headers
    ctx.fillStyle = '#f3f2f1';
    ctx.fillRect(0, 0, canvas.width, HEADER_SIZE);
    ctx.fillRect(0, 0, HEADER_SIZE, canvas.height);

    ctx.strokeStyle = '#d2d0ce';
    ctx.beginPath();

    // Vertical lines
    for (let i = 0; i <= COLS; i++) {
      const x = HEADER_SIZE + i * COL_WIDTH;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      if (i < COLS) {
        ctx.fillStyle = '#605e5c';
        ctx.textAlign = 'center';
        ctx.fillText(String.fromCharCode(65 + i), x + COL_WIDTH / 2, 20);
      }
    }

    // Horizontal lines
    for (let i = 0; i <= ROWS; i++) {
      const y = HEADER_SIZE + i * ROW_HEIGHT;
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      if (i < ROWS) {
        ctx.fillStyle = '#605e5c';
        ctx.textAlign = 'center';
        ctx.fillText((i + 1).toString(), 15, y + 17);
      }
    }
    ctx.stroke();

    // Draw Selection
    if (selectedCell) {
       ctx.strokeStyle = '#217346';
       ctx.lineWidth = 2;
       ctx.strokeRect(
         HEADER_SIZE + selectedCell.col * COL_WIDTH,
         HEADER_SIZE + selectedCell.row * ROW_HEIGHT,
         COL_WIDTH,
         ROW_HEIGHT
       );
       ctx.lineWidth = 1;
    }

    // Draw Content
    ctx.textAlign = 'left';
    ctx.fillStyle = '#323130';
    Object.entries(data).forEach(([id, cell]) => {
       const col = id.charCodeAt(0) - 65;
       const row = parseInt(id.slice(1)) - 1;
       const x = HEADER_SIZE + col * COL_WIDTH + 5;
       const y = HEADER_SIZE + row * ROW_HEIGHT + 17;

       let displayValue = cell.value;
       if (cell.formula) {
          try {
             displayValue = formulaParser.current.parse(cell.formula).toString();
          } catch(e) {
             displayValue = '#ERROR!';
          }
       }
       ctx.fillText(displayValue, x, y);
    });

  }, [data, selectedCell]);

  useEffect(() => {
    render();
  }, [render]);

  useEffect(() => {
    const id = documentId || 'unsaved_sheet';
    if (onDataChange) onDataChange(data);

    // Auto-save
    const interval = setInterval(async () => {
       const content = JSON.stringify(data);
       const encoder = new TextEncoder();
       await saveToOPFS(`sheet_${id}.json`, encoder.encode(content).buffer as ArrayBuffer);
       await saveDocumentMetadata({
          id,
          name: `Sheet ${id}`,
          type: 'Sheet',
          lastModified: Date.now()
       });
    }, 30000);

    return () => clearInterval(interval);
  }, [data, documentId, onDataChange]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - HEADER_SIZE;
    const y = e.clientY - rect.top - HEADER_SIZE;

    if (x < 0 || y < 0) return;

    const col = Math.floor(x / COL_WIDTH);
    const row = Math.floor(y / ROW_HEIGHT);

    if (col < COLS && row < ROWS) {
      setSelectedCell({ row, col });
      const cellId = getCellId(row, col);
      if (onCellSelect) {
        onCellSelect(row, col, data[cellId]?.value || '');
      }
    }
  };

  const handleDoubleClick = () => {
     if (selectedCell) {
        const cellId = getCellId(selectedCell.row, selectedCell.col);
        setEditingCell({
           ...selectedCell,
           value: data[cellId]?.formula || data[cellId]?.value || ''
        });
     }
  };

  const handleInputBlur = () => {
     if (editingCell) {
        const cellId = getCellId(editingCell.row, editingCell.col);
        const newData = { ...data };
        if (editingCell.value.startsWith('=')) {
           newData[cellId] = { value: '', formula: editingCell.value };
        } else {
           newData[cellId] = { value: editingCell.value };
        }
        setData(newData);
        setEditingCell(null);
     }
  };

  return (
    <div className="bg-white overflow-auto shadow-stitch relative" style={{ width: '1000px', height: '600px' }}>
      <canvas
        ref={canvasRef}
        width={HEADER_SIZE + COLS * COL_WIDTH}
        height={HEADER_SIZE + ROWS * ROW_HEIGHT}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        className="cursor-cell"
      />
      {editingCell && (
        <input
           autoFocus
           className="absolute border-2 border-office-sheet outline-none px-1 text-xs"
           style={{
              left: HEADER_SIZE + editingCell.col * COL_WIDTH,
              top: HEADER_SIZE + editingCell.row * ROW_HEIGHT,
              width: COL_WIDTH,
              height: ROW_HEIGHT
           }}
           value={editingCell.value}
           onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
           onBlur={handleInputBlur}
           onKeyDown={(e) => e.key === 'Enter' && handleInputBlur()}
        />
      )}
    </div>
  );
};
