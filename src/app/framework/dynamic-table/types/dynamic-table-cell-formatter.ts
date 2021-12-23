import { SafeHtml } from '@angular/platform-browser';

export type DynamicTableCellFormatter<TValue> = (row: TValue) => SafeHtml | null;
