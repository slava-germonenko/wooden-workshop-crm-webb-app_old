import { ProductItemStatuses } from '@common/enums';
import { IProduct } from '@common/interfaces';

export const DEFAULT_PRODUCT: IProduct = {
  id: '',
  russianName: '',
  englishName: '',
  vendorCode: '',
  description: '',
  width: 0,
  height: 0,
  depth: 0,
  isActive: true,
  isDelete: false,
  status: ProductItemStatuses.New,
  assets: [],
  productPrices: [],
};
