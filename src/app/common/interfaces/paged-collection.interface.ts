import { IPage } from './page.interface';

export interface IPagedCollection<T> {
  items: T[];
  page: IPage;
}
