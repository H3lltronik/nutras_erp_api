import { IBlock } from '@/src/@types/excel';
// import ExcelJS from 'exceljs';
import { SelectQueryBuilder } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ExcelJS = require('exceljs');

export type ExportBlock = {
  block: IBlock | null;
  startRow: number;
  startCol: number;
};

export abstract class BaseQueryExporter<T> {
  private queryBuilder: SelectQueryBuilder<T>;
  private defaultSheetName = 'Sheet1';

  constructor(queryBuilder: SelectQueryBuilder<T>) {
    this.queryBuilder = queryBuilder;
  }

  async getData(): Promise<T[]> {
    return this.queryBuilder.getMany();
  }

  abstract parseBlocks(): Promise<ExportBlock[]>;

  async parseExcel(): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const blocks = await this.parseBlocks();

    blocks.forEach((block) => {
      if (block.block) {
        let worksheet = workbook.getWorksheet(block.block.sheetTitle);
        if (!worksheet) {
          worksheet = workbook.addWorksheet(block.block.sheetTitle);
        }
        block.block.addToWorksheet(worksheet, block.startRow, block.startCol);
      }
    });

    return workbook.xlsx.writeBuffer() as Promise<Buffer>;
  }
}
