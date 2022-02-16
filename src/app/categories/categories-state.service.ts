import { Injectable } from '@angular/core';
import { CategoriesListService } from '@common/services';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  shareReplay,
  skip,
  switchMap,
} from 'rxjs';

import { DEFAULT_PAGE, EMPTY_STRING } from '@common/constants';
import { ICategory, IPage } from '@common/interfaces';

import { CategoriesService } from './common';

@Injectable()
export class CategoriesStateService {
  private readonly categoriesPageSource = new BehaviorSubject<IPage>(DEFAULT_PAGE);

  private readonly categoriesSearchSource = new BehaviorSubject<string>(EMPTY_STRING);

  public readonly categoriesPage$ = this.categoriesPageSource.asObservable();

  public readonly categories$: Observable<ICategory[]>;

  public readonly categoriesCount$: Observable<number>;

  public constructor(
    private readonly categoriesListService: CategoriesListService,
    private readonly categoriesService: CategoriesService,
  ) {
    const categoriesBase$ = combineLatest([
      this.categoriesPageSource,
      this.categoriesSearchSource.pipe(skip(1)),
    ])
      .pipe(
        switchMap(([page, search]) => this.categoriesListService.getCategoriesPage(page, search)),
        shareReplay(1),
      );

    this.categories$ = categoriesBase$.pipe(
      map((categoriesPage) => categoriesPage.items),
    );

    this.categoriesCount$ = categoriesBase$.pipe(
      map((categoriesPage) => categoriesPage.total),
    );
  }

  public addCategory(): void {
    this.categoriesService.openCreateCategoryDialog()
      .subscribe(() => this.resetPageAndSearch());
  }

  public removeCategory(category: ICategory): void {
    this.categoriesService.openDeleteCategoryDialog(category)
      .subscribe(() => this.resetPageAndSearch());
  }

  public setCategoriesPage(page: IPage): void {
    this.categoriesPageSource.next({ ...page });
  }

  public setCategoriesSearch(search: string): void {
    this.categoriesSearchSource.next(search);
  }

  public updateCategory(category: ICategory): void {
    this.categoriesService.openUpdateCategoryDialog(category)
      .subscribe(() => this.resetPageAndSearch());
  }

  private resetPageAndSearch(): void {
    this.categoriesPageSource.next(DEFAULT_PAGE);
    this.categoriesSearchSource.next('');
  }
}
