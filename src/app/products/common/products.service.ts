import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {
  Observable,
  catchError,
  switchMap,
  EMPTY,
} from 'rxjs';

import { ConfirmationDialogService, IConfirmationDialogConfiguration } from '@framework/confirmation-dialog';
import { DEFAULT_ERROR_MESSAGE} from '@common/constants';
import { ObjectsHelper } from '@common/helpers';
import { IProductThumbnail } from '@common/interfaces/models';
import { IOrderByQuery, IPage, IPagedCollection } from '@common/interfaces';
import { ApiUrlsService } from '@common/services';

import { ProductOrderByField } from '@app/products/common/types/product-order-by-field';
import { IProductsFilter } from '@app/products/common/interfaces/products-filter.interface';
import { ToastrService } from '@framework/toastr';

@Injectable()
export class ProductsService {
  private get productsUrl(): string {
    return this.apiUrlsService.getProductsBaseEndpointUrl();
  }

  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly httpClient: HttpClient,
    private readonly toastrService: ToastrService,
  ) { }

  public getProductsPage(
    page: IPage,
    order?: IOrderByQuery<ProductOrderByField>,
    filter?: Partial<IProductsFilter>,
  ): Observable<IPagedCollection<IProductThumbnail>> {
    const paramsObject = ObjectsHelper.createClean({
      ...page,
      ...order ?? {},
      ...filter ?? {},
    });

    const params = new HttpParams({ fromObject: paramsObject });
    return this.httpClient.get<IPagedCollection<IProductThumbnail>>(this.productsUrl, { params });
  }

  public openRemoveProductDialog(product: Pick<IProductThumbnail, 'id' | 'russianName'>): Observable<void | never> {
    const confirmationDialogConfig: Partial<IConfirmationDialogConfiguration> = {
      title: 'Удаление товара',
      question: `Вы действительно хотетите удалить товар ${product.russianName}? `
              + 'Товар будет храниться в базе и дальше, однако он будет недоступен для пользователей. '
              + 'Артикул удалённого товара невозможно переиспользовать в будущем.',
    };
    return this.confirmationDialogService.open(confirmationDialogConfig)
      .confirmed$
      .pipe(
        switchMap(() => this.removeProduct(product.id)),
        catchError((err: HttpErrorResponse) => {
          this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE);
          return EMPTY;
        }),
      );
  }

  public removeProduct(productId: string): Observable<void> {
    const productUrl = this.apiUrlsService.getProductBaseEndpointUrl(productId);
    return this.httpClient.delete<void>(productUrl);
  }
}
