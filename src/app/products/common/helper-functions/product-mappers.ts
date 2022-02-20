import { IProduct, IProductSize } from '@common/interfaces';

export function mapToBasicInformation(product: IProduct): Pick<IProduct, 'russianName' | 'englishName' | 'vendorCode'> {
  return {
    russianName: product.russianName,
    englishName: product.englishName,
    vendorCode: product.vendorCode,
  };
}

export function mapToProductSize(product: IProduct): IProductSize {
  return { height: product.height, width: product.width, depth: product.depth };
}
