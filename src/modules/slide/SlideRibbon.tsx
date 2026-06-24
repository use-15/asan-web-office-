import React from 'react';
import { Ribbon, RibbonGroup, RibbonButton } from '../../components/ribbon/Ribbon';
import {
  Save, Play, Square, Layout, Image as ImageIcon,
  Type, Move, Wand2, Monitor
} from 'lucide-react';

interface SlideRibbonProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSave: () => void;
  onStartShow: () => void;
}

export const SlideRibbon: React.FC<SlideRibbonProps> = ({ activeTab, onTabChange, onSave, onStartShow }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'insert', label: 'Insert' },
    { id: 'transitions', label: 'Transitions' },
    { id: 'animations', label: 'Animations' },
    { id: 'slideshow', label: 'Slide Show' },
  ];

  return (
    <Ribbon tabs={tabs} activeTab={activeTab} onTabChange={onTabChange}>
      {activeTab === 'home' && (
        <>
          <RibbonGroup label="File">
            <RibbonButton icon={<Save size={18} />} label="Save" onClick={onSave} />
          </RibbonGroup>
          <RibbonGroup label="Slides">
            <RibbonButton icon={<Layout size={18} />} label="New Slide" />
            <RibbonButton icon={<Square size={18} />} label="Layout" />
          </RibbonGroup>
        </>
      )}
      {activeTab === 'insert' && (
        <>
          <RibbonGroup label="Images">
            <RibbonButton icon={<ImageIcon size={18} />} label="Pictures" />
          </RibbonGroup>
          <RibbonGroup label="Text">
            <RibbonButton icon={<Type size={18} />} label="Text Box" />
          </RibbonGroup>
        </>
      )}
      {activeTab === 'transitions' && (
        <>
          <RibbonGroup label="Transition to This Slide">
            <RibbonButton icon={<Wand2 size={18} />} label="Morph" />
            <RibbonButton icon={<Move size={18} />} label="Fade" />
          </RibbonGroup>
        </>
      )}
      {activeTab === 'slideshow' && (
        <>
          <RibbonGroup label="Start Slide Show">
            <RibbonButton icon={<Play size={18} />} label="From Beginning" onClick={onStartShow} />
            <RibbonButton icon={<Monitor size={18} />} label="Presenter View" />
          </RibbonGroup>
        </>
      )}
    </Ribbon>
  );
};
