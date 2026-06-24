import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export const exportToDocx = async (editor: any) => {
  if (!editor) return;

  // For simplicity, we extract text content.
  // A production version would map canvas-editor JSON to docx elements.
  const data = editor.command.getValue();

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: data.map((item: any) => {
          return new Paragraph({
            children: [
              new TextRun(item.value || ''),
            ],
          });
        }),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "document.docx");
};

export const exportToPdf = async (editor: any) => {
  if (!editor) return;
  // canvas-editor has built-in print which can be used to save as PDF via browser
  editor.command.execute('print');
};
