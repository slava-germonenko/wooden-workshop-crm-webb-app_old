import { DatePipe } from '@angular/common';

import { PILL_COLOR_CLASSES } from '@common/constants';
import { PillType } from '@common/types';

import { DynamicTableCellFormatter } from '../types';

export class TableCellFormatters {
  public static date(format: string): DynamicTableCellFormatter<Date> {
    const datePipe = new DatePipe('ru');
    return (value: Date) => `<time datetime="${value.toString()}">${datePipe.transform(value, format)}</time>`;
  }

  public static defaultValue(defaultValue: string): DynamicTableCellFormatter<any> {
    return (value: any | undefined | null) => (value === undefined || value === null ? defaultValue : value);
  }

  public static number(precision: number): DynamicTableCellFormatter<number> {
    return (value: number) => (Number.isNaN(value) ? null : value.toFixed(precision));
  }

  public static pill(pillType: PillType): DynamicTableCellFormatter<any> {
    const pillClasses = `pill ${PILL_COLOR_CLASSES[pillType]}`;
    return (value: any) => `<span class="${pillClasses}">${value}</span>`;
  }
}
