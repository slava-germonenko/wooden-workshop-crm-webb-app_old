import { IPriceType } from '@common/interfaces/models';

export interface IProductPrice {
  priceTypeId: string;
  productId: string;
  value: string;
  priceType: IPriceType;
}
