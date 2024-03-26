import { Column } from '@/src/@types/excel';

export type PPListColumn = {
  productType: string;
  ppCategory: string;
  code: string;
  commonName: string;
  description: string;
  quantityPerUnit: string;
  measureUnit: string;
  ppPackaging: string;
  mold: string;
  provider: string;
  notes: string;
};

export const ppListExcelColumns: Column<PPListColumn>[] = [
  {
    header: 'Tipo de producto',
    key: 'productType',
    dataType: 'string',
    align: 'left',
    width: 20,
  },
  {
    header: 'Categoría',
    key: 'ppCategory',
    dataType: 'string',
    align: 'left',
    width: 20,
  },
  {
    header: 'Código',
    key: 'code',
    dataType: 'string',
    align: 'left',
    width: 30,
  },
  {
    header: 'Nombre',
    key: 'commonName',
    dataType: 'string',
    align: 'left',
    width: 20,
  },
  {
    header: 'Cantidad por unidad',
    key: 'quantityPerUnit',
    dataType: 'number',
    align: 'left',
    width: 20,
  },
  {
    header: 'Unidad de medida',
    key: 'measureUnit',
    dataType: 'string',
    align: 'center',
    width: 20,
  },
  {
    header: 'Empaque PP',
    key: 'ppPackaging',
    dataType: 'string',
    align: 'left',
    width: 20,
  },
  {
    header: 'Molde',
    key: 'mold',
    dataType: 'string',
    align: 'left',
    width: 20,
  },
  {
    header: 'Proveedor',
    key: 'provider',
    dataType: 'string',
    align: 'left',
    width: 20,
  },
  {
    header: 'Observaciones',
    key: 'notes',
    dataType: 'string',
    align: 'left',
    width: 40,
  },
  {
    header: 'Descripción',
    key: 'description',
    dataType: 'string',
    align: 'left',
    width: 40,
  },
];
