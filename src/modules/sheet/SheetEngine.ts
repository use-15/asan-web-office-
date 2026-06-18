import { DocumentEngine, type Rect, type Point } from '../../core/engine/types';

export interface CellData {
  value: string;
  formula?: string;
  format?: unknown;
}

export class SheetEngine extends DocumentEngine {
  private data: Record<string, CellData> = {
    'A1': { value: 'Item' },
    'B1': { value: 'Cost' },
    'A2': { value: 'Hosting' },
    'B2': { value: '100' },
    'A3': { value: 'Domain' },
    'B3': { value: '20' },
    'A4': { value: 'Total' },
    'B4': { value: '120', formula: '=SUM(B2:B3)' },
  };

  private selection: { start: Point; end: Point } | null = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 }
  };

  private colWidths: number[] = new Array(26).fill(100);
  private rowHeights: number[] = new Array(100).fill(25);

  render(ctx: CanvasRenderingContext2D, viewport: Rect): void {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(viewport.x, viewport.y, viewport.width, viewport.height);

    const headerHeight = 25;
    const headerWidth = 40;

    // Render Headers
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, viewport.width, headerHeight);
    ctx.fillRect(0, 0, headerWidth, viewport.height);

    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 1;

    // Grid Lines and Content
    let currentY = headerHeight;
    for (let r = 0; r < 50; r++) {
      let currentX = headerWidth;

      // Row Header
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, currentY, headerWidth, this.rowHeights[r]);
      ctx.fillStyle = '#666';
      ctx.font = '11px Segoe UI';
      ctx.textAlign = 'center';
      ctx.fillText((r + 1).toString(), headerWidth / 2, currentY + 17);

      for (let c = 0; c < 15; c++) {
        const cellId = `${String.fromCharCode(65 + c)}${r + 1}`;

        // Column Header (only on first row)
        if (r === 0) {
           ctx.fillStyle = '#f8f9fa';
           ctx.fillRect(currentX, 0, this.colWidths[c], headerHeight);
           ctx.fillStyle = '#666';
           ctx.textAlign = 'center';
           ctx.fillText(String.fromCharCode(65 + c), currentX + this.colWidths[c] / 2, 17);
        }

        // Selection Highlight
        if (this.selection && this.selection.start.x === c && this.selection.start.y === r) {
           ctx.fillStyle = 'rgba(33, 115, 70, 0.1)';
           ctx.fillRect(currentX, currentY, this.colWidths[c], this.rowHeights[r]);
           ctx.strokeStyle = '#217346';
           ctx.lineWidth = 2;
           ctx.strokeRect(currentX, currentY, this.colWidths[c], this.rowHeights[r]);
           ctx.strokeStyle = '#dee2e6';
           ctx.lineWidth = 1;
        } else {
           ctx.strokeRect(currentX, currentY, this.colWidths[c], this.rowHeights[r]);
        }

        // Cell Value
        const cell = this.data[cellId];
        if (cell) {
          ctx.fillStyle = '#000';
          ctx.textAlign = 'left';
          ctx.font = '13px Segoe UI';
          ctx.fillText(cell.value, currentX + 5, currentY + 17);
        }

        currentX += this.colWidths[c];
      }
      currentY += this.rowHeights[r];
    }
  }

  handleInput(event: unknown): void {
    const ev = event as { type: string, key: string };
    if (ev.type === 'keydown' && this.selection) {
      const cellId = `${String.fromCharCode(65 + this.selection.start.x)}${this.selection.start.y + 1}`;
      if (!this.data[cellId]) this.data[cellId] = { value: '' };

      if (ev.key.length === 1) {
        this.data[cellId].value += ev.key;
      } else if (ev.key === 'Backspace') {
        this.data[cellId].value = this.data[cellId].value.slice(0, -1);
      } else if (ev.key === 'ArrowRight') {
        this.selection.start.x++;
      } else if (ev.key === 'ArrowDown') {
        this.selection.start.y++;
      } else if (ev.key === 'ArrowLeft') {
        this.selection.start.x = Math.max(0, this.selection.start.x - 1);
      } else if (ev.key === 'ArrowUp') {
        this.selection.start.y = Math.max(0, this.selection.start.y - 1);
      }
    }
  }

  handleClick(point: Point): void {
     const headerHeight = 25;
     const headerWidth = 40;

     const x = point.x - headerWidth;
     const y = point.y - headerHeight;

     if (x < 0 || y < 0) return;

     let col = 0;
     let currentX = 0;
     while (currentX + this.colWidths[col] < x) {
        currentX += this.colWidths[col];
        col++;
     }

     let row = 0;
     let currentY = 0;
     while (currentY + this.rowHeights[row] < y) {
        currentY += this.rowHeights[row];
        row++;
     }

     this.selection = { start: { x: col, y: row }, end: { x: col, y: row } };
  }
}
