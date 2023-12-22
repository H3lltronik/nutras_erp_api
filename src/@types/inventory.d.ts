interface InventoryWarehouse {
  product_count: number;
  name: string;
  id: string;
}

interface InventoryProduct {
  product_id: string;
  product_name: string;
  total_product_count: number;
  warehouses: InventoryWarehouse[];
}

interface RawDataItem {
  product_id: string;
  product_name: string;
  warehouse_id: string;
  warehouse_name: string;
  lote_quantity: string;
  inventory_movement_quantity: string;
}
