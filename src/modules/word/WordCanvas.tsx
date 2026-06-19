import React, { useRef, useEffect, useState } from 'react'
import { WordEngine } from './WordEngine'
import { Bold, Italic, Underline, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

export const WordCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine] = useState(() => new WordEngine());
  const [, setTick] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      engine.render(ctx, { x: 0, y: 0, width: canvas.width, height: canvas.height });
      requestAnimationFrame(render);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent scrolling on arrow keys
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }
      engine.handleInput({ type: 'keydown', key: e.key });
      setTick(t => t + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    render();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [engine]);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Interactive Ribbon */}
      <div className="h-24 bg-[#f3f2f1] border-b border-slate-300 flex flex-col shrink-0">
        <div className="flex px-4 py-1 space-x-4 text-[10px] uppercase tracking-wider font-semibold">
          <span className="border-b-2 border-office-blue pb-1 cursor-pointer">File</span>
          <span className="opacity-40 cursor-pointer">Insert</span>
          <span className="opacity-40 cursor-pointer">Layout</span>
          <span className="opacity-40 cursor-pointer">Review</span>
        </div>
        <div className="flex-1 flex items-center px-4 space-x-4">
          <div className="flex space-x-1 border-r border-slate-300 pr-4">
            <button
              onClick={() => engine.toggleBold()}
              className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center hover:bg-slate-50 active:bg-slate-100"
              title="Bold"
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => engine.toggleItalic()}
              className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center hover:bg-slate-50 active:bg-slate-100"
              title="Italic"
            >
              <Italic size={16} />
            </button>
            <button className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center hover:bg-slate-50 active:bg-slate-100" title="Underline">
              <Underline size={16} />
            </button>
          </div>
          <div className="flex space-x-1 border-r border-slate-300 pr-4">
            <button className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center hover:bg-slate-50"><AlignLeft size={16} /></button>
            <button className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center hover:bg-slate-50"><AlignCenter size={16} /></button>
            <button className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center hover:bg-slate-50"><AlignRight size={16} /></button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-white border border-slate-300 rounded px-2 h-8 space-x-2">
              <Type size={14} className="text-slate-400" />
              <select className="text-xs bg-transparent outline-none">
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Courier New</option>
              </select>
            </div>
            <select className="h-8 bg-white border border-slate-300 rounded px-2 text-xs outline-none w-16">
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>14</option>
              <option>18</option>
              <option>24</option>
            </select>
          </div>
        </div>
      </div>

      {/* Document Workspace */}
      <div className="flex-1 bg-[#dadad9] relative overflow-auto flex justify-center p-8">
        <canvas
          ref={canvasRef}
          width={816}
          height={1056}
          className="bg-white shadow-lg cursor-text"
        />
      </div>
    </div>
  )
}
