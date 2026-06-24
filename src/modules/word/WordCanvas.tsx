import React, { useRef, useEffect } from 'react';
import Editor from '@hufe921/canvas-editor';

interface WordCanvasProps {
  onEditorReady: (editor: any) => void;
}

export const WordCanvas: React.FC<WordCanvasProps> = ({ onEditorReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const editor = new Editor(containerRef.current,
        {
          header: [{ value: 'Asan Word Header', type: 'text' as any }],
          main: [
            {
              value: 'Welcome to Asan Word\n',
              type: 'text' as any,
              size: 24,
            },
            {
              value: 'This is a professional word processor with full DOCX support.',
              type: 'text' as any,
            },
          ],
          footer: [{ value: 'Page 1', type: 'text' as any }],
        } as any,
        {
          margins: [100, 100, 100, 100],
        },
      );

      onEditorReady(editor);

      return () => {
        editor.destroy();
      };
    }
  }, []);

  return (
    <div className="flex-1 bg-office-neutral-30 overflow-auto flex justify-center p-8">
      <div
        ref={containerRef}
        className="bg-white shadow-stitch-lg"
        style={{ width: '816px', minHeight: '1056px' }}
      />
    </div>
  );
};
