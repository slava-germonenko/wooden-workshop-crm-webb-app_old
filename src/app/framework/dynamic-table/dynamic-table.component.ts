import {
  ChangeDetectionStrategy,
  EventEmitter,
  Component,
  Input,
  Output,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { IPage } from '@common/interfaces';

import { DEFAULT_PAGE, DEFAULT_PAGING_OPTIONS } from './constants';
import { IDynamicTableColumnDefinition } from './interfaces';

@Component({
  selector: 'ww-dynamic-table',
  templateUrl: 'dynamic-table.component.html',
  styleUrls: ['dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent {
  @Input()
  public set columnDefinitions(columns: IDynamicTableColumnDefinition<unknown>[]) {
    this.columns = columns;
    this.displayedColumnNames = columns.map((column) => column.name);
  }

  @Input()
  public pageIndex = DEFAULT_PAGE.index;

  @Input()
  public pageSize = DEFAULT_PAGE.size;

  @Input()
  public dataSource: any = [];

  @Input()
  public length = 0;

  @Input()
  public noDataMessage: string = 'По данному запросу ничего не найдено';

  @Input()
  public pageSizeOptions = [...DEFAULT_PAGING_OPTIONS];

  @Input()
  public showPaging = true;

  @Output()
  public pageChange = new EventEmitter<IPage>();

  public columns: IDynamicTableColumnDefinition<unknown>[] = [];

  public displayedColumnNames: string[] = [];

  // eslint-disable-next-line class-methods-use-this
  public getCellHtml(
    columnDef: IDynamicTableColumnDefinition<unknown>,
    row: any,
  ): SafeHtml | null {
    if (columnDef.format && columnDef.getValue) {
      return columnDef.format(columnDef.getValue(row));
    }

    if (columnDef.format) {
      return columnDef.format(row[columnDef.name]);
    }

    if (columnDef.getValue) {
      return columnDef.getValue(row);
    }

    return String(row[columnDef.name]);
  }
}
