import { OrderDirection } from '@common/types';

export interface IOrderByQuery<TOrderByFields extends string> {
  direction: OrderDirection;
  orderBy: TOrderByFields;
}
