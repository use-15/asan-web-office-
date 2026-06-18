import { DocumentEngine, type Rect, type Point } from '../../core/engine/types';

export class PDFEngine extends DocumentEngine {
  private pageCount: number = 1;
  private currentPage: number = 1;

  render(ctx: CanvasRenderingContext2D, viewport: Rect): void {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(viewport.x, viewport.y, viewport.width, viewport.height);

    // Mock PDF Content
    ctx.fillStyle = '#b30b00';
    ctx.font = 'bold 24px Segoe UI';
    ctx.fillText('Asan PDF Viewer', 50, 80);

    ctx.fillStyle = '#333';
    ctx.font = '14px Segoe UI';
    ctx.fillText(`Page ${this.currentPage} of ${this.pageCount}`, 50, 110);

    // Drawing mock content blocks
    ctx.fillStyle = '#f3f2f1';
    for (let i = 0; i < 10; i++) {
        ctx.fillRect(50, 150 + (i * 40), 700, 20);
    }

    ctx.fillStyle = '#666';
    ctx.fillText('[PDF Engine Ready - Pure Client Side Rendering]', 50, 600);
  }

  handleInput(_event: unknown): void {
    // Navigation, Zoom, etc.
  }

  handleClick(_point: Point): void {
    // Selection, Annotations
  }
}
