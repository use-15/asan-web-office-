import { DocumentEngine, type Rect, type Point } from '../../core/engine/types';

export interface SlideObject {
  id: string;
  type: 'text' | 'shape' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  color: string;
}

export class SlideEngine extends DocumentEngine {
  private objects: SlideObject[] = [
    { id: '1', type: 'text', x: 100, y: 100, width: 600, height: 100, content: 'Presentation Title', color: '#d24726' },
    { id: '2', type: 'shape', x: 100, y: 250, width: 200, height: 150, content: 'rect', color: '#f3f2f1' },
    { id: '3', type: 'text', x: 350, y: 250, width: 350, height: 200, content: 'Click to add subtitle or description for this slide.', color: '#333' },
  ];

  private selectedId: string | null = null;
  private isDragging = false;
  private dragOffset: Point = { x: 0, y: 0 };

  render(ctx: CanvasRenderingContext2D, viewport: Rect): void {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(viewport.x, viewport.y, viewport.width, viewport.height);

    this.objects.forEach(obj => {
      if (obj.type === 'text') {
        ctx.fillStyle = obj.color;
        ctx.font = obj.id === '1' ? 'bold 44px Segoe UI' : '24px Segoe UI';
        ctx.fillText(obj.content, obj.x, obj.y + 40);
      } else if (obj.type === 'shape') {
        ctx.fillStyle = obj.color;
        ctx.strokeStyle = '#d24726';
        ctx.lineWidth = 2;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
      }

      if (this.selectedId === obj.id) {
        ctx.strokeStyle = '#005a9e';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(obj.x - 5, obj.y - 5, obj.width + 10, obj.height + 10);
        ctx.setLineDash([]);
      }
    });
  }

  handleInput(event: unknown): void {
    const ev = event as { type: string, x: number, y: number };
    if (ev.type === 'mousedown') {
      const obj = [...this.objects].reverse().find(o =>
        ev.x >= o.x && ev.x <= o.x + o.width &&
        ev.y >= o.y && ev.y <= o.y + o.height
      );

      if (obj) {
        this.selectedId = obj.id;
        this.isDragging = true;
        this.dragOffset = { x: ev.x - obj.x, y: ev.y - obj.y };
      } else {
        this.selectedId = null;
      }
    } else if (ev.type === 'mousemove' && this.isDragging && this.selectedId) {
      const obj = this.objects.find(o => o.id === this.selectedId);
      if (obj) {
        obj.x = ev.x - this.dragOffset.x;
        obj.y = ev.y - this.dragOffset.y;
      }
    } else if (ev.type === 'mouseup') {
      this.isDragging = false;
    }
  }

  // Not used directly as handleInput takes care of it but for consistency
  handleClick(_point: Point): void {}
}
