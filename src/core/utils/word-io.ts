import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import type { Editor } from '@hufe921/canvas-editor';

export async function exportToDocx(editor: Editor, filename: string = 'document.docx') {
  const data = editor.command.getValue();

  // Basic conversion from canvas-editor data to docx
  // Note: For a production app, this would need to handle nested styles, tables, images etc.
  const dataList = Array.isArray(data) ? data : (data as any).data || [];
  const children = dataList.map((item: any) => {
    if (item.type === 'text' || !item.type) {
      return new Paragraph({
        children: [
          new TextRun({
            text: item.value,
            bold: !!item.bold,
            italics: !!item.italic,
            underline: item.underline ? {} : undefined,
            size: (item.size || 14) * 2, // docx uses half-points
            color: item.color || '000000',
            font: item.font || 'Arial'
          }),
        ],
      });
    }
    return null;
  }).filter(Boolean) as Paragraph[];

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
