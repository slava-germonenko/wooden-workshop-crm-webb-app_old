import { IProductThumbnail } from '@common/interfaces';

export type ProductOrderByField =
  keyof Pick<IProductThumbnail, 'russianName' | 'englishName' | 'vendorCode' | 'category' | 'material'>;
