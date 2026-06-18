import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import Editor from '@hufe921/canvas-editor'

export interface WordCanvasHandle {
  exportDocx: () => void;
  command: (type: string, value?: any) => void;
}

export const WordCanvas = forwardRef<WordCanvasHandle, {}>((_props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);

  useImperativeHandle(ref, () => ({
    exportDocx: () => {
       // @ts-ignore
       editorRef.current?.command.executeDownload();
    },
    command: (type: string, value?: any) => {
        if (!editorRef.current) return;
        switch(type) {
            case 'bold': editorRef.current.command.executeBold(); break;
            case 'italic': editorRef.current.command.executeItalic(); break;
            case 'underline': editorRef.current.command.executeUnderline(); break;
            case 'fontSize': editorRef.current.command.executeSize(value); break;
            case 'fontFamily': editorRef.current.command.executeFont(value); break;
        }
    }
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    editorRef.current = new Editor(containerRef.current, [
      {
        value: "Welcome to Asan Word\n",
        size: 32,
        bold: true,
        color: '#2b579a'
      },
      {
        value: "The most powerful canvas-based editor for the web.",
        size: 16
      }
    ], {
        margins: [100, 100, 100, 100]
    });

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  return (
    <div className="bg-[#dadad9] p-8 min-h-full flex justify-center overflow-auto">
      <div
        ref={containerRef}
        className="bg-white shadow-2xl border border-[#edebe9]"
      />
    </div>
  )
});
