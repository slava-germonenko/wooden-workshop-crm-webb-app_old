import { ProductItemStatuses } from '@common/enums';

export interface IProductsFilter {
  search: string;
  materialId: string;
  categoryId: string;
  isActive: boolean;
  status: ProductItemStatuses;
}
