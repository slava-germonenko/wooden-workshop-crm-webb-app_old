import { DynamicTableCellFormatter } from '../types';

export interface IDynamicTableColumnDefinition<TRow> {
  name: string;
  label: string;
  format?: DynamicTableCellFormatter<any>;
  sortable?: boolean;
  getValue?<TValue>(row: TRow): TValue;
}