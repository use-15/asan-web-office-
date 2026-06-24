import React, { useRef, useEffect, useState } from 'react';

export interface SlideElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
}

export interface Slide {
  id: string;
  elements: SlideElement[];
}

interface SlideCanvasProps {
  slides: Slide[];
  currentSlideIndex: number;
  onUpdateElement: (index: number, elementId: string, updates: Partial<SlideElement>) => void;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({ slides, currentSlideIndex, onUpdateElement }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const slide = slides[currentSlideIndex];
      if (!slide) return;

      slide.elements.forEach(el => {
        if (el.type === 'text') {
          ctx.fillStyle = '#000000';
          ctx.font = `${el.fontSize || 24}px Arial`;
          ctx.fillText(el.value, el.x, el.y);

          // Draw selection box
          if (el.id === selectedElementId) {
            ctx.strokeStyle = '#0078d4';
            ctx.lineWidth = 2;
            const metrics = ctx.measureText(el.value);
            ctx.strokeRect(el.x - 5, el.y - (el.fontSize || 24), metrics.width + 10, (el.fontSize || 24) + 10);
          }
        }
      });
    };

    render();
  }, [slides, currentSlideIndex, selectedElementId]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const slide = slides[currentSlideIndex];
    const clickedElement = [...slide.elements].reverse().find(el => {
      // Basic hit detection for text
      return x >= el.x && x <= el.x + el.width && y >= el.y - el.height && y <= el.y;
    });

    if (clickedElement) {
      setSelectedElementId(clickedElement.id);
      setIsDragging(true);
      setDragOffset({ x: x - clickedElement.x, y: y - clickedElement.y });
    } else {
      setSelectedElementId(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedElementId) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    onUpdateElement(currentSlideIndex, selectedElementId, {
      x: x - dragOffset.x,
      y: y - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex-1 bg-office-neutral-30 overflow-auto flex justify-center p-8">
      <canvas
        ref={canvasRef}
        width={960}
        height={540}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="bg-white shadow-stitch-lg cursor-default"
      />
    </div>
  );
};
