export interface TextRun {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize: number;
  fontFamily: string;
  color: string;
}

export interface Paragraph {
  runs: TextRun[];
  alignment: 'left' | 'center' | 'right' | 'justify';
}

export interface WordDocument {
  paragraphs: Paragraph[];
}
