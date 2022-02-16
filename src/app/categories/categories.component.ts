import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Component, HostBinding,
} from '@angular/core';

import { DEFAULT_PAGE } from '@common/constants';
import { ICategory, IPage } from '@common/interfaces';

import { CategoriesStateService } from './categories-state.service';
import { CATEGORIES_TABLE_ACTIONS, CATEGORIES_TABLE_COLUMNS } from './common';

@Component({
  selector: 'ww-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly categories$ = this.categoriesService.categories$;

  public readonly categoriesCount$ = this.categoriesService.categoriesCount$;

  public readonly tableRowActions = [...CATEGORIES_TABLE_ACTIONS];

  public readonly tableColumnDefinitions = [...CATEGORIES_TABLE_COLUMNS];

  public categoriesPage = DEFAULT_PAGE;

  public constructor(
    private readonly categoriesService: CategoriesStateService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.categoriesService.categoriesPage$
      .subscribe((page) => {
        this.categoriesPage = page;
        this.changeDetectorRef.markForCheck();
      });
  }

  public addCategory(): void {
    this.categoriesService.addCategory();
  }

  public dispatchTableRowAction(rowAction: { item: ICategory; action: string }): void | never {
    switch (rowAction.action) {
      case 'remove':
        this.categoriesService.removeCategory(rowAction.item);
        break;
      case 'update':
        this.categoriesService.updateCategory(rowAction.item);
        break;
      default:
        throw new Error(`Action not supported ${rowAction.action}.`);
    }
  }

  public setCategoriesSearch(search: string): void {
    this.categoriesService.setCategoriesSearch(search);
  }

  public setCategoriesPage(page: IPage): void {
    this.categoriesService.setCategoriesPage(page);
  }
}
