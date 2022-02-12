import {
  ChangeDetectionStrategy,
  EventEmitter,
  Component,
  Input,
  Output, ChangeDetectorRef,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';

import { IButton, IOrderByQuery, IPage } from '@common/interfaces';

import { DEFAULT_PAGE, DEFAULT_PAGING_OPTIONS } from './constants';
import { IDynamicTableColumnDefinition } from './interfaces';

@Component({
  selector: 'ww-dynamic-table',
  templateUrl: 'dynamic-table.component.html',
  styleUrls: ['dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent<TRow extends Record<string, any>> {
  @Input()
  public set columnDefinitions(columns: IDynamicTableColumnDefinition<TRow>[]) {
    this.columns = columns;
    this.displayedColumnNames = columns.map((column) => column.name);
    if (this.rowActions.length && !this.displayedColumnNames.includes('_actions')) {
      this.displayedColumnNames.push('_actions');
    }
  }

  @Input()
  public set actions(actions: Pick<IButton, 'name' | 'label' | 'icon'>[]) {
    this.rowActions = actions;
    const actionsColumnIndex = this.displayedColumnNames.indexOf('_actions');
    if (actionsColumnIndex >= 0 && !actions.length) {
      this.displayedColumnNames.splice(actionsColumnIndex, 0);
    }
    if (actionsColumnIndex < 0 && actions.length) {
      this.displayedColumnNames.push('_actions');
    }
    this.changeDetector.markForCheck();
  }

  @Input()
  public dataSource: TRow[] | Observable<TRow[]> = [];

  @Input()
  public length = 0;

  @Input()
  public noDataMessage: string = 'По данному запросу ничего не найдено.';

  @Input()
  public pageIndex = DEFAULT_PAGE.index;

  @Input()
  public pageSize = DEFAULT_PAGE.size;

  @Input()
  public pageSizeOptions = [...DEFAULT_PAGING_OPTIONS];

  @Input()
  public showPaging = true;

  @Output()
  public pageChange = new EventEmitter<IPage>();

  @Output()
  public rowAction = new EventEmitter<{ item: TRow, action: string }>();

  @Output()
  public rowClick = new EventEmitter<unknown>();

  @Output()
  public sortChange = new EventEmitter<IOrderByQuery<string> | null>();

  public rowActions: Pick<IButton, 'name' | 'label' | 'icon'>[] = [];

  public columns: IDynamicTableColumnDefinition<unknown>[] = [];

  public displayedColumnNames: string[] = [];

  public constructor(private readonly changeDetector: ChangeDetectorRef) { }

  // eslint-disable-next-line class-methods-use-this
  public getCellHtml(
    columnDef: IDynamicTableColumnDefinition<TRow>,
    row: TRow,
  ): SafeHtml | null {
    const value = columnDef.getValue ? columnDef.getValue(row) : row[columnDef.name];
    const formatter = columnDef.getDynamicFormatter ? columnDef.getDynamicFormatter(row) : columnDef.format;
    return formatter ? formatter(value) : String(value);
  }

  public emitSortChange(matSort: Sort): void {
    if (!matSort.direction || !matSort.active) {
      this.sortChange.emit(null);
    } else {
      this.sortChange.emit({ direction: matSort.direction, orderBy: matSort.active });
    }
  }
}
