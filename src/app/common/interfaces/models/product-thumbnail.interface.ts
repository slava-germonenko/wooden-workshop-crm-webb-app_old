import { ProductItemStatuses } from '@common/enums/product-item-statuses';
import { ICategory, IMaterial, IProductSize } from '@common/interfaces/models';

export interface IProductThumbnail {
  id: string;
  russianName: string;
  englishName: string;
  vendorCode: string;
  isActive: boolean;
  status: ProductItemStatuses;
  size: IProductSize;
  category?: ICategory;
  material?: IMaterial;
}
