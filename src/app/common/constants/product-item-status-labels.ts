import { ProductItemStatuses } from '@common/enums/product-item-statuses';

export const PRODUCT_ITEM_STATUS_LABELS: Record<ProductItemStatuses, string> = {
  [ProductItemStatuses.None]: '-- --',
  [ProductItemStatuses.New]: 'Новинка',
  [ProductItemStatuses.OnSale]: 'Распродажа',
  [ProductItemStatuses.OnWarehouse]: 'На складе',
};
