import { CustomStyledTableBlock } from '@/src/common/excel/table_blocks/CustomStyledTableBlock';
import {
  BaseQueryExporter,
  ExportBlock,
} from '@/src/common/utils/default-exporter';
import { Product } from '../entities/product.entity';
import { PPListColumn, ppListExcelColumns } from './columns/pp-list-columns';

export class ProductListExporter extends BaseQueryExporter<Product> {
  async parseBlocks(): Promise<ExportBlock[]> {
    const data = await this.getData();

    const flattenData: PPListColumn[] = data.map((product) => {
      return {
        code: product.completeCode ?? '',
        commonName: product.commonName ?? '',
        description: product.notes ?? '',
        measureUnit: product.unit.name ?? '',
        productType: product.productType.name ?? '',
        ppCategory: product.productTypeCategory?.name ?? '',
        quantityPerUnit: product.quantityPerUnit ?? '',
        ppPackaging: product.productionData?.packaging ?? '',
        mold: product.productionData.mold ?? '',
        provider: product.provider.name ?? '',
        notes: product.notes ?? '',
      };
    });

    const styledTable = new CustomStyledTableBlock(
      'Sheet1',
      ppListExcelColumns,
      flattenData,
    );

    return [
      {
        block: styledTable,
        startRow: 1,
        startCol: 1,
      },
    ];
  }
}
