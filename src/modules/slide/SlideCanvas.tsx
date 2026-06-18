import React, { useRef, useEffect } from 'react'
import { SlideEngine } from './SlideEngine'

export const SlideCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SlideEngine>(new SlideEngine());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 960 * dpr;
    canvas.height = 540 * dpr;
    canvas.style.width = '960px';
    canvas.style.height = '540px';
    ctx.scale(dpr, dpr);

    const render = () => {
      engineRef.current.render(ctx, { x: 0, y: 0, width: 960, height: 540 });
      requestAnimationFrame(render);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      engineRef.current.handleInput({ type: 'mousedown', x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      engineRef.current.handleInput({ type: 'mousemove', x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseUp = () => {
      engineRef.current.handleInput({ type: 'mouseup' });
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const animationId = requestAnimationFrame(render);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="bg-[#dadad9] p-12 min-h-full flex justify-center items-center">
      <canvas
        ref={canvasRef}
        className="bg-white shadow-2xl border border-[#edebe9] cursor-default"
      />
    </div>
  )
}
