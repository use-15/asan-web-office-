import { DocumentEngine, type Rect } from '../../core/engine/types';
import { type WordDocument } from './types';

export class WordEngine extends DocumentEngine {
  private document: WordDocument = {
    paragraphs: [
      {
        alignment: 'left',
        runs: [
          { text: 'Asan Office ', bold: true, fontSize: 24, fontFamily: 'Arial', color: '#2b579a' },
          { text: 'Advanced Word Processor', bold: false, italic: true, fontSize: 18, fontFamily: 'Arial', color: '#666666' }
        ]
      },
      {
        alignment: 'left',
        runs: [
          { text: 'Experience seamless offline editing with professional formatting tools.', fontSize: 12, fontFamily: 'Arial', color: '#333333' }
        ]
      }
    ]
  };

  private cursor = { paragraphIndex: 0, runIndex: 0, charIndex: 0 };
  private blink = true;

  constructor() {
    super();
    setInterval(() => { this.blink = !this.blink; }, 500);
  }

  render(ctx: CanvasRenderingContext2D, viewport: Rect): void {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(viewport.x, viewport.y, viewport.width, viewport.height);

    let currentY = 100;
    const marginX = 72;
    const pageWidth = viewport.width - (marginX * 2);

    this.document.paragraphs.forEach((para, pIdx) => {
      let currentX = marginX;
      let maxHeightInLine = 0;

      para.runs.forEach((run, rIdx) => {
        ctx.font = `${run.bold ? 'bold ' : ''}${run.italic ? 'italic ' : ''}${run.fontSize}px ${run.fontFamily}`;
        ctx.fillStyle = run.color;

        const metrics = ctx.measureText(run.text);
        maxHeightInLine = Math.max(maxHeightInLine, run.fontSize * 1.2);

        if (currentX + metrics.width > marginX + pageWidth) {
           currentX = marginX;
           currentY += maxHeightInLine;
        }

        ctx.fillText(run.text, currentX, currentY);

        // Render Cursor
        if (this.blink && pIdx === this.cursor.paragraphIndex && rIdx === this.cursor.runIndex) {
           const beforeCursorText = run.text.slice(0, this.cursor.charIndex);
           const cursorX = currentX + ctx.measureText(beforeCursorText).width;
           ctx.beginPath();
           ctx.moveTo(cursorX, currentY - run.fontSize);
           ctx.lineTo(cursorX, currentY + (run.fontSize * 0.2));
           ctx.strokeStyle = '#000000';
           ctx.stroke();
        }

        if (run.underline) {
          ctx.beginPath();
          ctx.moveTo(currentX, currentY + 2);
          ctx.lineTo(currentX + metrics.width, currentY + 2);
          ctx.stroke();
        }

        currentX += metrics.width;
      });

      currentY += maxHeightInLine + 10;
    });
  }

  handleInput(event: any): void {
    if (event.type === 'keydown') {
      const { key } = event;
      const para = this.document.paragraphs[this.cursor.paragraphIndex];
      const run = para.runs[this.cursor.runIndex];

      if (key.length === 1) {
        run.text = run.text.slice(0, this.cursor.charIndex) + key + run.text.slice(this.cursor.charIndex);
        this.cursor.charIndex++;
      } else if (key === 'Backspace' && this.cursor.charIndex > 0) {
        run.text = run.text.slice(0, this.cursor.charIndex - 1) + run.text.slice(this.cursor.charIndex);
        this.cursor.charIndex--;
      } else if (key === 'ArrowLeft' && this.cursor.charIndex > 0) {
        this.cursor.charIndex--;
      } else if (key === 'ArrowRight' && this.cursor.charIndex < run.text.length) {
        this.cursor.charIndex++;
      }
    }
  }

  toggleBold(): void {
     const para = this.document.paragraphs[this.cursor.paragraphIndex];
     const run = para.runs[this.cursor.runIndex];
     run.bold = !run.bold;
  }

  toggleItalic(): void {
     const para = this.document.paragraphs[this.cursor.paragraphIndex];
     const run = para.runs[this.cursor.runIndex];
     run.italic = !run.italic;
  }
}
