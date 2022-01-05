import { BaseDynamicTableValue, DynamicTableCellFormatter } from '../types';

export interface IDynamicTableColumnDefinition<TRow, TCellValue = BaseDynamicTableValue> {
  name: string;
  label: string;
  format?: DynamicTableCellFormatter<TCellValue>;
  sortable?: boolean;
  getDynamicFormatter?(row: TRow): DynamicTableCellFormatter<TCellValue>;
  getLink?(row: TRow): string | string[];
  getValue?(row: TRow): TCellValue;
}
