import { PRODUCT_ITEM_STATUS_LABELS } from '@common/constants';
import { ProductItemStatuses } from '@common/enums';

export const PRODUCT_STATUS_LABELS_MAP: { status: ProductItemStatuses, label: string }[] = [
  {
    status: ProductItemStatuses.None,
    label: 'Без Статуса',
  },
  {
    status: ProductItemStatuses.New,
    label: PRODUCT_ITEM_STATUS_LABELS[ProductItemStatuses.New],
  },
  {
    status: ProductItemStatuses.OnSale,
    label: PRODUCT_ITEM_STATUS_LABELS[ProductItemStatuses.OnSale],
  },
  {
    status: ProductItemStatuses.OnWarehouse,
    label: PRODUCT_ITEM_STATUS_LABELS[ProductItemStatuses.OnWarehouse],
  },
];
