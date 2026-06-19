import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export async function exportToXlsx(data: Record<string, { value: string }>, filename: string = 'spreadsheet.xlsx') {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  Object.entries(data).forEach(([id, cell]) => {
    const col = id.charCodeAt(0) - 65 + 1;
    const row = parseInt(id.slice(1));
    worksheet.getCell(row, col).value = cell.value;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), filename);
}
