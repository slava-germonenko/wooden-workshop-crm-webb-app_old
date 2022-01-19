import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DateFormatService {
  public constructor(@Inject(LOCALE_ID) private readonly locale: string) { }

  public format(date: Date, format?: string): string {
    return formatDate(date, format ?? 'medium', this.locale);
  }
}
