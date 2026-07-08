import React, { useState } from 'react';
import { Ribbon, RibbonGroup } from '../../components/ribbon/Ribbon';
import { Button } from '../../components/stitch/Button';
import {
  Play, Image as ImageIcon, Type, Shapes,
  FilePlus, Save, FolderOpen, Plus, MousePointer2
} from 'lucide-react';
import pptxgen from 'pptxgenjs';

interface SlideElement {
  id: string;
  type: 'text' | 'shape';
  x: number;
  y: number;
  w: number;
  h: number;
  content: string;
  color?: string;
  fontSize?: number;
}

interface Slide {
  id: number;
  elements: SlideElement[];
}

export const SlideModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: 1,
      elements: [
        { id: '1', type: 'text', x: 100, y: 50, w: 600, h: 100, content: 'Click to add title', fontSize: 44, color: '#333' },
        { id: '2', type: 'text', x: 100, y: 200, w: 600, h: 50, content: 'Click to add subtitle', fontSize: 24, color: '#666' }
      ]
    }
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now(),
      elements: [
        { id: Math.random().toString(), type: 'text', x: 100, y: 50, w: 600, h: 100, content: 'New Slide Title', fontSize: 36, color: '#333' }
      ]
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  const handleExport = () => {
    const pres = new pptxgen();
    slides.forEach((slide) => {
      const pSlide = pres.addSlide();
      slide.elements.forEach(el => {
        if (el.type === 'text') {
          pSlide.addText(el.content, {
            x: el.x / 100,
            y: el.y / 100,
            w: el.w / 100,
            h: el.h / 100,
            fontSize: el.fontSize,
            color: el.color?.replace('#', '')
          });
        }
      });
    });
    pres.writeFile({ fileName: 'presentation.pptx' });
  };

  const addTextElement = () => {
    const newSlides = [...slides];
    const newEl: SlideElement = {
      id: Math.random().toString(),
      type: 'text',
      x: 200,
      y: 200,
      w: 200,
      h: 50,
      content: 'New Text',
      fontSize: 18,
      color: '#000'
    };
    newSlides[currentSlideIndex].elements.push(newEl);
    setSlides(newSlides);
    setSelectedElementId(newEl.id);
  };

  const updateElementContent = (id: string, content: string) => {
    const newSlides = [...slides];
    const el = newSlides[currentSlideIndex].elements.find(e => e.id === id);
    if (el) el.content = content;
    setSlides(newSlides);
  };

  const slideRibbonTabs = [
    { id: 'home', label: 'Home' },
    { id: 'insert', label: 'Insert' },
    { id: 'transitions', label: 'Transitions' },
    { id: 'animations', label: 'Animations' },
    { id: 'slideshow', label: 'Slide Show' },
  ];

  const renderHomeGroups = () => (
    <>
      <RibbonGroup label="Slides">
        <Button variant="secondary" size="sm" onClick={addSlide} className="flex-col h-16 w-16">
          <Plus size={20} />
          <span className="text-[10px] mt-1">New Slide</span>
        </Button>
      </RibbonGroup>
      <RibbonGroup label="Insert">
        <div className="flex space-x-2">
           <Button variant="secondary" size="sm" onClick={addTextElement} className="w-8"><Type size={14} /></Button>
           <Button variant="secondary" size="sm" className="w-8"><ImageIcon size={14} /></Button>
           <Button variant="secondary" size="sm" className="w-8"><Shapes size={14} /></Button>
        </div>
      </RibbonGroup>
      <RibbonGroup label="Editing">
         <Button variant="secondary" size="sm" className="w-8"><MousePointer2 size={14} /></Button>
      </RibbonGroup>
    </>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-stitch-neutral-50">
       <div className="bg-office-slide text-white h-8 flex items-center px-4 space-x-4 shrink-0">
         <Button variant="action" size="sm" onClick={() => setSlides([{ id: 1, elements: [] }])}><FilePlus size={14} className="mr-2"/> New</Button>
         <Button variant="action" size="sm" onClick={handleExport}><Save size={14} className="mr-2"/> Save</Button>
         <Button variant="action" size="sm"><FolderOpen size={14} className="mr-2"/> Open</Button>
         <div className="w-px h-4 bg-white/20 mx-2" />
         <Button variant="action" size="sm"><Play size={14} className="mr-2"/> From Beginning</Button>
      </div>

      <Ribbon
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={slideRibbonTabs}
        groups={activeTab === 'home' ? renderHomeGroups() : <div className="text-xs text-stitch-neutral-500">Slide transitions and animations coming soon...</div>}
        brandColor="var(--color-office-slide)"
      />

      <div className="flex-1 flex overflow-hidden">
         {/* Slide Thumbnails */}
         <div className="w-48 bg-stitch-neutral-100 border-r border-stitch-neutral-300 overflow-y-auto p-4 flex flex-col space-y-4">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`aspect-video bg-white border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-[10px] text-stitch-neutral-400 overflow-hidden relative ${
                  currentSlideIndex === idx ? 'border-office-slide' : 'border-stitch-neutral-300'
                }`}
              >
                <div className="absolute top-1 left-1">{idx + 1}</div>
                {slide.elements.slice(0, 3).map(el => (
                  <div key={el.id} className="w-3/4 h-1 bg-stitch-neutral-200 mb-1" />
                ))}
              </div>
            ))}
         </div>

         {/* Canvas Area */}
         <div className="flex-1 bg-stitch-neutral-200 p-12 flex items-center justify-center overflow-auto" onClick={() => setSelectedElementId(null)}>
            <div
              className="aspect-video bg-white shadow-2xl w-full max-w-4xl relative border border-stitch-neutral-300 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
               {slides[currentSlideIndex].elements.map((el) => (
                 <div
                   key={el.id}
                   style={{
                     position: 'absolute',
                     left: el.x,
                     top: el.y,
                     width: el.w,
                     height: el.h,
                     color: el.color,
                     fontSize: el.fontSize,
                     border: selectedElementId === el.id ? '1px dashed #d24726' : '1px solid transparent',
                     cursor: 'move'
                   }}
                   onClick={() => setSelectedElementId(el.id)}
                 >
                   {el.type === 'text' && (
                     <textarea
                       className="w-full h-full bg-transparent outline-none resize-none overflow-hidden"
                       value={el.content}
                       onChange={(e) => updateElementContent(el.id, e.target.value)}
                     />
                   )}
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
