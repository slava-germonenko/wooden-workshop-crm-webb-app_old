import { ProductItemStatuses } from '@common/enums';
import {
  ICategory,
  IMaterial,
  IProductAsset,
  IProductPrice,
} from '@common/interfaces/models';

export interface IProduct {
  id: string;
  russianName: string;
  englishName: string;
  vendorCode: string;
  description: string;
  width: number;
  height: number;
  depth: number;
  isActive: boolean;
  isDelete: boolean;
  status: ProductItemStatuses;
  categoryId?: string;
  materialId?: string;
  category?: ICategory;
  material?: IMaterial;
  assets: IProductAsset[];
  productPrices: IProductPrice[];
}
