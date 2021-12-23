import { DatePipe } from '@angular/common';

import { DynamicTableCellFormatter } from '../types';

export class TableCellFormatters {
  public static date(format: string): DynamicTableCellFormatter<Date> {
    const datePipe = new DatePipe(navigator.language);
    return (value: Date) => datePipe.transform(value, format);
  }

  public static number(precision: number): DynamicTableCellFormatter<number> {
    return (value: number) => (Number.isNaN(value) ? null : value.toFixed(precision));
  }

  public static withDefaultValue(defaultValue: string): DynamicTableCellFormatter<any> {
    return (value: any | undefined | null) => (value === undefined || value === null ? defaultValue : value);
  }
}
