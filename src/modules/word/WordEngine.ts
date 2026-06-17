import { DocumentEngine, type Rect } from '../../core/engine/types';

export interface TextBlock {
  text: string;
  font: string;
  fontSize: number;
  color: string;
  x: number;
  y: number;
}

export class WordEngine extends DocumentEngine {
  private content: TextBlock[] = [
    { text: 'Welcome to Asan Word', font: 'Arial', fontSize: 32, color: '#2b579a', x: 50, y: 100 },
    { text: 'This is a canvas-based high-performance rendering engine.', font: 'Arial', fontSize: 16, color: '#333333', x: 50, y: 150 },
    { text: 'Start typing to begin your document...', font: 'Arial', fontSize: 14, color: '#999999', x: 50, y: 180 },
  ];

  render(ctx: CanvasRenderingContext2D, viewport: Rect): void {
    // Clear
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(viewport.x, viewport.y, viewport.width, viewport.height);

    // Render Blocks
    this.content.forEach(block => {
      ctx.font = `${block.fontSize}px ${block.font}`;
      ctx.fillStyle = block.color;
      ctx.fillText(block.text, block.x, block.y);
    });
  }

  handleInput(event: any): void {
    // Basic text insertion logic (simplified)
    if (event.type === 'keydown' && event.key.length === 1) {
       const lastBlock = this.content[this.content.length - 1];
       lastBlock.text += event.key;
    } else if (event.type === 'keydown' && event.key === 'Backspace') {
       const lastBlock = this.content[this.content.length - 1];
       lastBlock.text = lastBlock.text.slice(0, -1);
    }
  }
}
