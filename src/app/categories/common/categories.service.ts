import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Observable,
  EMPTY,
  catchError,
  filter,
  switchMap,
  map,
} from 'rxjs';

import { ConfirmationDialogService } from '@framework/confirmation-dialog';
import { DynamicFormDialogService } from '@framework/dynamic-form-dialog';
import { ToastrService } from '@framework/toastr';
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';
import { ICategory } from '@common/interfaces/models';
import { ApiUrlsService } from '@common/services';

import { CONFIRM_CATEGORY_REMOVAL_DIALOG_CONFIG, CREATE_CATEGORY_DIALOG_CONFIG } from './category-dialogs-settings';

@Injectable()
export class CategoriesService {
  public constructor(
    private readonly apiUrlService: ApiUrlsService,
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly formDialogService: DynamicFormDialogService,
    private readonly httpClient: HttpClient,
    private readonly toastr: ToastrService,
  ) { }

  public openCreateCategoryDialog(): Observable<ICategory | never> {
    return this.formDialogService.openFormDialog(CREATE_CATEGORY_DIALOG_CONFIG)
      .afterClosed()
      .pipe(
        filter((categoryDto) => !!categoryDto?.name),
        switchMap((categoryDto) => this.saveCategory(categoryDto)),
      );
  }

  public openDeleteCategoryDialog(category: Pick<ICategory, 'id' | 'name'>): Observable<void | never> {
    return this.confirmationDialogService.open(CONFIRM_CATEGORY_REMOVAL_DIALOG_CONFIG)
      .confirmed$
      .pipe(
        switchMap(() => {
          const categoryUrl = this.apiUrlService.getCategoryBaseEndpointUrl(category.id);
          return this.httpClient.delete<void>(categoryUrl);
        }),
      );
  }

  public openUpdateCategoryDialog(category: Pick<ICategory, 'id' | 'name'>): Observable<ICategory | never> {
    return this.formDialogService.openFormDialog(CREATE_CATEGORY_DIALOG_CONFIG, category)
      .afterClosed()
      .pipe(
        filter((categoryDto) => !!categoryDto?.name),
        map((categoryDto) => ({ name: categoryDto.name, id: category.id })),
        switchMap((categoryDto) => this.saveCategory(categoryDto)),
      );
  }

  public saveCategory(category: Partial<ICategory>): Observable<ICategory | never> {
    const categoriesUrl = this.apiUrlService.getCategoriesBaseEndpointUrl();
    return this.httpClient.put<ICategory>(categoriesUrl, category)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE);
          return EMPTY;
        }),
      );
  }
}
