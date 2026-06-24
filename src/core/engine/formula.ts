import HyperFormula from 'hyperformula';

const options = {
  licenseKey: 'gpl-v3',
};

const hf = HyperFormula.buildEmpty(options);
const sheetId = hf.addSheet('Sheet1') as unknown as number;

export const evaluateFormula = (formula: string, _context: any) => {
  if (!formula.startsWith('=')) return formula;

  try {
    hf.setCellContents({ sheet: sheetId, col: 0, row: 0 }, [[formula]]);
    const result = hf.getCellValue({ sheet: sheetId, col: 0, row: 0 });

    if (result === null) return '';
    if (typeof result === 'object' && result !== null) {
      return '#ERROR!';
    }
    return result.toString();
  } catch (e) {
    console.error('Formula error:', e);
    return '#ERROR!';
  }
};
