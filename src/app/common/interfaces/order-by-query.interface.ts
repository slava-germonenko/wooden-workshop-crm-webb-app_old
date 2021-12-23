import { OrderDirection } from '@app/common';

export interface IOrderByQuery<TOrderByFields extends string> {
  direction: OrderDirection;
  orderBy: TOrderByFields;
}
