import React, { useRef, useEffect } from 'react'
import { SheetEngine } from './SheetEngine'

export const SheetCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SheetEngine>(new SheetEngine());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      engineRef.current.render(ctx, { x: 0, y: 0, width: rect.width, height: rect.height });
      requestAnimationFrame(render);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace'].includes(e.key)) {
        e.preventDefault();
      }
      engineRef.current.handleInput({ type: 'keydown', key: e.key });
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      engineRef.current.handleClick({ x, y });
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('mousedown', handleMouseDown);

    const animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="flex-1 bg-white overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="cursor-cell"
      />
    </div>
  )
}
