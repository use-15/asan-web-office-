import React, { useRef, useEffect } from 'react'
import { Editor } from '@hufe921/canvas-editor'
import { saveToOPFS, readFromOPFS } from '../../core/storage/opfs'
import { saveDocumentMetadata } from '../../core/storage/db'

interface WordCanvasProps {
  onEditorReady?: (editor: Editor) => void;
  documentId?: string;
}

export const WordCanvas: React.FC<WordCanvasProps> = ({ onEditorReady, documentId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const editor = new Editor(containerRef.current, [
      {
        value: 'Welcome to Asan Word\n',
          size: 32,
          color: '#2b579a',
          bold: true
      } as any,
        {
          value: 'A high-performance, AI-native word processor.\n',
          size: 16,
          color: '#333333'
      } as any,
        {
          value: 'Start typing to begin your document...',
          size: 14,
          color: '#999999'
      } as any
      ], {
      margins: [100, 100, 100, 100],
      width: 816,
      height: 1056,
    });

    editorRef.current = editor;

    // Auto-load if documentId is provided
    if (documentId) {
       readFromOPFS(`word_${documentId}.json`).then(data => {
          if (data) {
             const decoder = new TextDecoder();
             const json = JSON.parse(decoder.decode(data));
             editor.command.executeSetValue(json);
          }
       }).catch(() => {});
    }

    // Auto-save logic
    const saveInterval = setInterval(async () => {
       if (editorRef.current) {
          const content = JSON.stringify(editorRef.current.command.getValue());
          const encoder = new TextEncoder();
          const buffer = encoder.encode(content).buffer as ArrayBuffer;
          const id = documentId || 'unsaved';
          await saveToOPFS(`word_${id}.json`, buffer);
          await saveDocumentMetadata({
             id,
             name: `Document ${id}`,
             type: 'Word',
             lastModified: Date.now()
          });
       }
    }, 30000);

    if (onEditorReady) {
      onEditorReady(editor);
    }

    return () => {
      clearInterval(saveInterval);
      editor.destroy();
    };
  }, [onEditorReady, documentId]);

  return (
    <div
      ref={containerRef}
      className="bg-office-neutral-200 shadow-stitch"
      style={{ width: '816px', height: '1056px' }}
    />
  )
}
