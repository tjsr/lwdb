import exceljs from 'exceljs';
import fs from 'node:fs';
import { mapSheetJsValueByType } from './xlsCsvConvertUtil.js';
import { verifyStatOrExit } from './fileAccess.js';
import { worksheetOutputFilenameForTarget } from './csvFileUtils.js';

// type OutputFiles = {
//   csvFile: string;
//   jsonFile: string;
// };

export const sheetAsJson = (worksheet: exceljs.Worksheet, headerRowNumber: number = 1): object[] => {
  const headerRow: exceljs.Row = worksheet.getRow(headerRowNumber);
  const headers: (string|undefined)[] = [];
  headerRow.eachCell((cell, colunmNumber: number) => {
    headers[colunmNumber] = cell.value?.toString();
  });

  const rows: object[] = [];
  worksheet.eachRow((row: exceljs.Row, rowNumber: number) => {
    if (rowNumber == headerRowNumber) {
      return;
    }
    const rowObject: Record<string, string|number|boolean> = {};
    let rowHasData = false;
    row.eachCell((cell, columnNumber: number) => {
      const header: string|undefined = headers[columnNumber];
      const value = mapSheetJsValueByType(cell.value);
      if (header !== undefined && cell.value) {
        rowObject[header] = value;
        rowHasData = true;
      }
    });
    if (rowHasData) {
      rows.push(rowObject);
    }
  });
  return rows;
};

export const convertToJsonFile = async (
  worksheet: exceljs.Worksheet, outputPath: string, excludeColumns?: string[]
): Promise<string> => {
  const outputDirStats = await verifyStatOrExit(outputPath);
  const outputPathIsDirectory = outputDirStats.isDirectory();
  const jsonOutputFilename: string = worksheetOutputFilenameForTarget(
    worksheet.name, outputPath, outputPathIsDirectory, 'json'
  );
  const outputStream = fs.createWriteStream(jsonOutputFilename);
  await jsonToStream(worksheet, outputStream, excludeColumns);
  outputStream.close();
  return Promise.resolve(jsonOutputFilename);
};

export const jsonToStream = async (
  worksheet: exceljs.Worksheet, outputStream: fs.WriteStream, excludeColumns?: string[]
): Promise<void> => {
  const sheetData: object[] = sheetAsJson(worksheet).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: Record<string, any>) => {
      excludeColumns?.forEach((column: string) => {
        delete row[column];
      });
      return row;
    });

  outputStream.write(JSON.stringify(sheetData, null, 2));
};
