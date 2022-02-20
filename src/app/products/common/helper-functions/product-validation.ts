import { IProduct, IProductSize } from '@common/interfaces';

export function productBasicInformationIsValid(
  { russianName, englishName, vendorCode }: Pick<IProduct, 'russianName' | 'englishName' | 'vendorCode'>,
): boolean {
  return !!russianName.length && !!englishName.length && !!vendorCode.length;
}

export function productSizeIsValid(size: IProductSize): boolean {
  return size.depth > 0 && size.width > 0 && size.height > 0;
}
