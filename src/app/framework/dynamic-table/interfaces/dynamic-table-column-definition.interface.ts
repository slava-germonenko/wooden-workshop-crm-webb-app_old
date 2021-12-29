import { DynamicTableCellFormatter } from '../types';

export interface IDynamicTableColumnDefinition<TRow> {
  name: string;
  label: string;
  format?: DynamicTableCellFormatter<any>;
  sortable?: boolean;
  getDynamicFormatter?(row: TRow): DynamicTableCellFormatter<any>;
  getLink?(row: TRow): string | string[];
  getValue?(row: TRow): any;
}
