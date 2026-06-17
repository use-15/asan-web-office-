export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Point, Size {}

export abstract class DocumentEngine {
  abstract render(ctx: CanvasRenderingContext2D, viewport: Rect): void;
  abstract handleInput(event: any): void;
}
