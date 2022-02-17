import { IPage } from '@common/interfaces';

export function pagesAreEqual(leftPage: IPage, rightPage: IPage): boolean {
  return leftPage.size === rightPage.size && leftPage.index === rightPage.index;
}
