import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Component,
  HostBinding,
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs';

import { DEFAULT_PAGE } from '@common/constants';
import { ProductItemStatuses } from '@common/enums';
import { pagesAreEqual } from '@common/helper-functions';
import { ICategory, IMaterial, IProductThumbnail } from '@common/interfaces/models';
import { IOrderByQuery } from '@common/interfaces';

import {
  ProductOrderByField,
  PRODUCTS_TABLE_ACTIONS,
  PRODUCTS_TABLE_COLUMNS,
  PRODUCT_STATUS_LABELS_MAP,
} from './common';
import { ProductsStateService } from './products-state.service';

@Component({
  selector: 'ww-products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly tableActions = [...PRODUCTS_TABLE_ACTIONS];

  public readonly tableColumnDefinitions = [...PRODUCTS_TABLE_COLUMNS];

  public readonly categories$ = this.productsService.categories$;

  public readonly materials$ = this.productsService.materials$;

  public readonly products$ = this.productsService.products$;

  public readonly productsCount$ = this.productsService.productsCount$;

  public readonly productStatuses = [...PRODUCT_STATUS_LABELS_MAP];

  public advancedFiltersEnabled = false;

  public selectedCategory: ICategory | null = null;

  public selectedMaterial: IMaterial | null = null;

  public currentProductsPage = DEFAULT_PAGE;

  public constructor(
    private readonly productsService: ProductsStateService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.productsService.productsPage$
      .pipe(
        distinctUntilChanged(pagesAreEqual),
      )
      .subscribe((page) => {
        this.currentProductsPage = page;
        this.changeDetectorRef.markForCheck();
      });
  }

  // eslint-disable-next-line class-methods-use-this
  public displayName({ name }: Pick<ICategory, 'name'> | Pick<IMaterial, 'name'>): string {
    return name;
  }

  public dispatchTableRowAction({ item, action }: { item: IProductThumbnail; action: string }): void | never {
    switch (action) {
      case 'delete':
        this.productsService.openRemoveProductDialog(item);
        break;
      case 'edit':
        break;
      default:
        throw new Error(`Action not supported: ${action}!`);
    }
  }

  public setProductCategoryFilter(category: ICategory | null): void {
    this.selectedCategory = category;
    this.productsService.setProductCategoryFilter(category);
  }

  public setProductCategorySearch(search: string): void {
    this.productsService.setCategoriesSearch(search);
  }

  public setProductIsActiveFilter(active: boolean | 1): void {
    this.productsService.setProductIsActiveFilter(typeof active === 'boolean' ? active : undefined);
  }

  public setProductMaterialFilter(material: IMaterial | null): void {
    this.selectedMaterial = material;
    this.productsService.setProductMaterialFilter(material);
  }

  public setProductMaterialSearch(search: string): void {
    this.productsService.setProductMaterialsSearch(search);
  }

  public setProductsSearch(search: string): void {
    this.productsService.setProductsSearch(search);
  }

  public setProductsSort(sort: IOrderByQuery<string> | null): void {
    this.productsService.setProductsSort(sort as IOrderByQuery<ProductOrderByField> ?? undefined);
  }

  public setProductStatusFilter(status: ProductItemStatuses | null): void {
    this.productsService.setProductStatusFilter(status);
  }
}
