import ExcelJS from 'exceljs';

export type ColumnDataTypes = {
  string: 'string';
  number: 'number';
  money: 'money';
  time: 'time';
};

type OnCellReturn = {
  colSpan?: number;
  style?: Partial<ExcelJS.Style>;
};

type Column<T = any> = {
  header: string;
  key: keyof T;
  dataType: keyof ColumnDataTypes;
  width?: number;
  align?: 'left' | 'right' | 'center';
  colSpan?: number;
  onCell?: (item: T, index: number) => OnCellReturn;
};

export interface IBlock {
  addToWorksheet(
    worksheet: ExcelJS.Worksheet,
    startRow: number,
    startCol: number,
  ): void;
  sheetTitle: string;
}
