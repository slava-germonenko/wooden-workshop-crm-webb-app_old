import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  distinctUntilChanged,
  map,
  shareReplay,
  skip,
  switchMap,
} from 'rxjs';

import { DEFAULT_PAGE } from '@common/constants';
import { ProductItemStatuses } from '@common/enums';
import { IOrderByQuery, IPage } from '@common/interfaces';
import { ICategory, IMaterial, IProductThumbnail } from '@common/interfaces/models';
import { CategoriesListService, MaterialsListService } from '@common/services';

import { IProductsFilter, ProductOrderByField, ProductsService } from './common';

@Injectable()
export class ProductsStateService {
  private readonly categoriesSearchSource = new BehaviorSubject<string>('');

  private readonly materialsSearchSource = new BehaviorSubject<string>('');

  private readonly productsFilterSource = new BehaviorSubject<Partial<IProductsFilter>>({});

  private readonly productsOrderSource = new BehaviorSubject<IOrderByQuery<ProductOrderByField> | undefined>(
    undefined,
  );

  private readonly productsPageSource = new BehaviorSubject<IPage>(DEFAULT_PAGE);

  public readonly categories$ = this.categoriesSearchSource.pipe(
    distinctUntilChanged(),
    switchMap((search) => this.categoriesListService.getCategoriesPage(DEFAULT_PAGE, search)),
    map((categoriesPage) => categoriesPage.items),
    shareReplay(1),
  );

  public readonly materials$ = this.materialsSearchSource.pipe(
    distinctUntilChanged(),
    switchMap((search) => this.materialsListService.getMaterialsPage(DEFAULT_PAGE, search)),
    map((materialsPage) => materialsPage.items),
    shareReplay(1),
  );

  public readonly products$: Observable<IProductThumbnail[]>;

  public readonly productsCount$: Observable<number>;

  public readonly productsPage$ = this.productsPageSource.asObservable();

  public constructor(
    private readonly categoriesListService: CategoriesListService,
    private readonly materialsListService: MaterialsListService,
    private readonly productsService: ProductsService,
  ) {
    const productsPage$ = combineLatest([
      this.productsPageSource,
      this.productsOrderSource,
      this.productsFilterSource.pipe(skip(1)),
    ])
      .pipe(
        switchMap(([page, order, filter]) => this.productsService.getProductsPage(page, order, filter)),
        shareReplay(1),
      );

    this.products$ = productsPage$.pipe(
      map((productsPage) => productsPage.items),
    );

    this.productsCount$ = productsPage$.pipe(
      map((productsPage) => productsPage.total),
    );
  }

  public openRemoveProductDialog(product: IProductThumbnail): void {
    this.productsService.openRemoveProductDialog(product)
      .subscribe(() => this.reloadCurrentPage());
  }

  public setProductCategoryFilter(category: ICategory | null): void {
    const currentProductsFilter = this.productsFilterSource.value;
    currentProductsFilter.categoryId = category?.id;
    this.productsFilterSource.next({ ...currentProductsFilter });
  }

  public setCategoriesSearch(search: string): void {
    this.categoriesSearchSource.next(search);
  }

  public setProductIsActiveFilter(status: boolean | undefined): void {
    const currentProductsFilter = this.productsFilterSource.value;
    currentProductsFilter.isActive = status;
    this.productsFilterSource.next({ ...currentProductsFilter });
  }

  public setProductMaterialFilter(material: IMaterial | null): void {
    const currentProductsFilter = this.productsFilterSource.value;
    currentProductsFilter.materialId = material?.id;
    this.productsFilterSource.next({ ...currentProductsFilter });
  }

  public setProductMaterialsSearch(search: string): void {
    this.materialsSearchSource.next(search);
  }

  public setProductsSearch(search: string): void {
    const currentProductsFilter = this.productsFilterSource.value;
    currentProductsFilter.search = search;
    this.productsFilterSource.next({ ...currentProductsFilter });
  }

  public setProductsSort(sort: IOrderByQuery<ProductOrderByField> | undefined): void {
    this.productsOrderSource.next(sort);
  }

  public setProductStatusFilter(status: ProductItemStatuses | null): void {
    const currentProductsFilter = this.productsFilterSource.value;
    currentProductsFilter.status = status ?? undefined;
    this.productsFilterSource.next({ ...currentProductsFilter });
  }

  private reloadCurrentPage(): void {
    const currentPage = this.productsPageSource.value;
    this.productsPageSource.next({ ...currentPage });
  }
}
