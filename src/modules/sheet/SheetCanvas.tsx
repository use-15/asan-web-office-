import React, { useRef, useEffect } from 'react';
import 'canvas-datagrid';

interface SheetCanvasProps {
  onGridReady: (grid: any) => void;
}

export const SheetCanvas: React.FC<SheetCanvasProps> = ({ onGridReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // @ts-ignore
      const grid = document.createElement('canvas-datagrid');
      containerRef.current.appendChild(grid);

      grid.style.width = '100%';
      grid.style.height = '100%';

      // @ts-ignore
      grid.data = [
        { A: 'Welcome', B: 'to', C: 'Asan Sheet' },
        { A: 1, B: 2, C: 3 },
      ];

      onGridReady(grid);

      return () => {
        if (containerRef.current) {
          containerRef.current.removeChild(grid);
        }
      };
    }
  }, []);

  return (
    <div className="flex-1 bg-white overflow-hidden relative">
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
};
