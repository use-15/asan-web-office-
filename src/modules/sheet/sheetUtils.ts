import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportToXlsx = async (grid: any) => {
  if (!grid) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  const data = grid.data;
  if (data && data.length > 0) {
    const keys = Object.keys(data[0]);
    worksheet.columns = keys.map(key => ({ header: key, key }));
    worksheet.addRows(data);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'workbook.xlsx');
};
