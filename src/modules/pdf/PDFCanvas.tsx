import React, { useRef, useEffect } from 'react'
import { PDFEngine } from './PDFEngine'

export const PDFCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<PDFEngine>(new PDFEngine());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 816 * dpr;
    canvas.height = 1056 * dpr;
    canvas.style.width = '816px';
    canvas.style.height = '1056px';
    ctx.scale(dpr, dpr);

    const render = () => {
      engineRef.current.render(ctx, { x: 0, y: 0, width: 816, height: 1056 });
      requestAnimationFrame(render);
    };

    const animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="bg-[#dadad9] p-8 min-h-full flex justify-center">
      <canvas
        ref={canvasRef}
        className="bg-white shadow-2xl border border-[#edebe9] cursor-default"
      />
    </div>
  )
}
