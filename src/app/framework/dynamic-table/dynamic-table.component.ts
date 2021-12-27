import {
  ChangeDetectionStrategy,
  Sanitizer,
  EventEmitter,
  Component,
  Input,
  Output,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Sort } from '@angular/material/sort';

import { IOrderByQuery, IPage } from '@common/interfaces';

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
  public set columnDefinitions(columns: IDynamicTableColumnDefinition<any>[]) {
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
  public length = 1;

  @Input()
  public noDataMessage: string = 'По данному запросу ничего не найдено';

  @Input()
  public pageSizeOptions = [...DEFAULT_PAGING_OPTIONS];

  @Input()
  public showPaging = true;

  @Output()
  public pageChange = new EventEmitter<IPage>();

  @Output()
  public rowClick = new EventEmitter<unknown>();

  @Output()
  public sortChange = new EventEmitter<IOrderByQuery<string> | null>();

  public columns: IDynamicTableColumnDefinition<unknown>[] = [];

  public displayedColumnNames: string[] = [];

  // eslint-disable-next-line class-methods-use-this
  public getCellHtml(
    columnDef: IDynamicTableColumnDefinition<unknown>,
    row: any,
  ): SafeHtml | null {
    const value = columnDef.getValue ? columnDef.getValue(row) : row[columnDef.name];
    const formatter = columnDef.getDynamicFormatter ? columnDef.getDynamicFormatter(row) : columnDef.format;
    return formatter ? formatter(value) : value;
  }

  public emitSortChange(matSort: Sort): void {
    if (!matSort.direction || !matSort.active) {
      this.sortChange.emit(null);
    } else {
      this.sortChange.emit({ direction: matSort.direction, orderBy: matSort.active });
    }
  }
}
