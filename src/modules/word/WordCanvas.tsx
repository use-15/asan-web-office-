import React, { useRef, useEffect } from 'react'
import { WordEngine } from './WordEngine'

export const WordCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<WordEngine>(new WordEngine());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      engineRef.current.render(ctx, { x: 0, y: 0, width: canvas.width, height: canvas.height });
      requestAnimationFrame(render);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      engineRef.current.handleInput({ type: 'keydown', key: e.key });
    };

    window.addEventListener('keydown', handleKeyDown);
    render();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={816}
      height={1056}
      className="bg-white shadow-lg cursor-text"
    />
  )
}
