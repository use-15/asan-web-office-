import React, { useState, useEffect, useRef } from 'react';
import { saveToOPFS } from '../../core/storage/opfs'
import { saveDocumentMetadata } from '../../core/storage/db'

interface SlideElement {
  id: string;
  type: 'text' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  value: string;
}

interface Slide {
  id: number;
  elements: SlideElement[];
}

interface SlideCanvasProps {
  onSlidesChange?: (slides: Slide[]) => void;
  documentId?: string;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({ onSlidesChange, documentId }) => {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: 1,
      elements: [
        { id: '1', type: 'text', x: 100, y: 100, width: 600, height: 100, value: 'Click to add title' }
      ]
    }
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const dragRef = useRef<{ id: string, startX: number, startY: number, initialX: number, initialY: number } | null>(null);

  const addElement = (type: 'text' | 'shape') => {
     const newElement: SlideElement = {
        id: Date.now().toString(),
        type,
        x: 200,
        y: 200,
        width: 200,
        height: 100,
        value: type === 'text' ? 'New Text' : ''
     };
     const newSlides = [...slides];
     newSlides[activeSlideIndex].elements.push(newElement);
     setSlides(newSlides);
  };

  useEffect(() => {
    if (onSlidesChange) onSlidesChange(slides);
    const id = documentId || 'unsaved_slide';
    const interval = setInterval(async () => {
       const content = JSON.stringify(slides);
       const encoder = new TextEncoder();
       await saveToOPFS(`slide_${id}.json`, encoder.encode(content).buffer as ArrayBuffer);
       await saveDocumentMetadata({
          id,
          name: `Slide ${id}`,
          type: 'Slide',
          lastModified: Date.now()
       });
    }, 30000);
    return () => clearInterval(interval);
  }, [slides, documentId, onSlidesChange]);

  const handleMouseDown = (e: React.MouseEvent, el: SlideElement) => {
    e.stopPropagation();
    setSelectedElementId(el.id);
    dragRef.current = {
      id: el.id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: el.x,
      initialY: el.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragRef.current) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      const newSlides = [...slides];
      const el = newSlides[activeSlideIndex].elements.find(item => item.id === dragRef.current?.id);
      if (el) {
        el.x = dragRef.current.initialX + dx;
        el.y = dragRef.current.initialY + dy;
        setSlides(newSlides);
      }
    }
  };

  const handleMouseUp = () => {
    dragRef.current = null;
  };

  return (
    <div
      className="flex w-full h-full bg-office-neutral-200 relative select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Sidebar Thumbnails */}
      <div className="w-48 bg-office-neutral-100 border-r border-office-neutral-300 flex flex-col p-4 space-y-4 overflow-y-auto shrink-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => setActiveSlideIndex(index)}
            className={`w-full aspect-video bg-white border-2 cursor-pointer transition-all flex items-center justify-center text-[10px] text-office-neutral-400 ${
              activeSlideIndex === index ? 'border-office-slide shadow-sm' : 'border-office-neutral-300 hover:border-office-neutral-400'
            }`}
          >
            Slide {index + 1}
          </div>
        ))}
        <button
          onClick={() => setSlides([...slides, { id: Date.now(), elements: [] }])}
          className="w-full py-2 border-2 border-dashed border-office-neutral-300 text-office-neutral-400 text-xs hover:bg-office-neutral-200 transition-colors"
        >
          + New Slide
        </button>
      </div>

      {/* Main Stage */}
      <div className="flex-1 flex items-center justify-center p-12 relative" onClick={() => setSelectedElementId(null)}>
        <div className="w-full max-w-4xl aspect-video bg-white shadow-stitch relative overflow-hidden">
            {slides[activeSlideIndex].elements.map(el => (
               <div
                  key={el.id}
                  onMouseDown={(e) => handleMouseDown(e, el)}
                  style={{
                     position: 'absolute',
                     left: el.x,
                     top: el.y,
                     width: el.width,
                     height: el.height,
                     border: selectedElementId === el.id ? '2px solid #d24726' : '1px dashed transparent'
                  }}
                  className="group hover:border-office-neutral-300 cursor-move flex items-center justify-center"
               >
                  {el.type === 'text' ? (
                     <textarea
                        className="w-full h-full text-center bg-transparent outline-none text-2xl font-bold resize-none overflow-hidden"
                        value={el.value}
                        onChange={(e) => {
                           const newSlides = [...slides];
                           const element = newSlides[activeSlideIndex].elements.find(item => item.id === el.id);
                           if (element) element.value = e.target.value;
                           setSlides(newSlides);
                        }}
                     />
                  ) : (
                     <div className="w-full h-full bg-office-slide-light border border-office-slide" />
                  )}
               </div>
            ))}
        </div>

        {/* Floating Add Menu */}
        <div className="absolute bottom-8 right-8 flex space-x-2">
           <button onClick={() => addElement('text')} className="bg-office-slide text-white px-4 py-2 rounded shadow-lg text-xs font-bold hover:bg-office-slide-dark transition-colors">Add Text</button>
           <button onClick={() => addElement('shape')} className="bg-office-slide text-white px-4 py-2 rounded shadow-lg text-xs font-bold hover:bg-office-slide-dark transition-colors">Add Shape</button>
        </div>
      </div>
    </div>
  );
};
