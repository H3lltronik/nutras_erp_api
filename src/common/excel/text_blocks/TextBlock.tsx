import { IBlock } from '@/src/@types/excel';
import ExcelJS from 'exceljs';

export class TextBlock implements IBlock {
  sheetTitle: string;
  private content: string[];
  private style: Partial<ExcelJS.Style>;
  private maxCharLength: number; // Máximo número de caracteres para una celda antes de hacer merge

  constructor(
    sheetTitle: string,
    content: string[],
    style?: Partial<ExcelJS.Style>,
    maxCharLength = 50,
  ) {
    this.sheetTitle = sheetTitle;
    this.content = content;
    this.style = style || this.getDefaultStyle();
    this.maxCharLength = maxCharLength;
  }

  private getDefaultStyle(): Partial<ExcelJS.Style> {
    return {
      font: {
        size: 12,
        color: { argb: 'FF000000' },
      },
      alignment: {
        vertical: 'middle',
        horizontal: 'left',
      },
    };
  }

  public addToWorksheet(
    worksheet: ExcelJS.Worksheet,
    startRow: number,
    startCol: number,
  ): void {
    this.content.forEach((text, index) => {
      const row = worksheet.getRow(startRow + index);
      const cell = row.getCell(startCol);
      cell.value = text;
      cell.style = this.style;

      // Determinar si el texto es "demasiado largo"
      if (text.length > this.maxCharLength) {
        // Calcular el número de celdas a unir basado en la longitud del texto y un criterio de división
        const cellsToMerge = Math.ceil(text.length / this.maxCharLength);
        worksheet.mergeCells(
          startRow + index,
          startCol,
          startRow + index,
          startCol + cellsToMerge - 1,
        );
      }
    });
  }
}
