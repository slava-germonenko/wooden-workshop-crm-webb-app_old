import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  EMPTY,
  Observable,
  catchError,
  switchMap,
  filter,
} from 'rxjs';

import { ConfirmationDialogService } from '@framework/confirmation-dialog';
import { DynamicFormDialogService } from '@framework/dynamic-form-dialog';
import { ToastrService } from '@framework/toastr';

import { DEFAULT_ERROR_MESSAGE } from '@common/constants';
import { IMaterial } from '@common/interfaces/models';
import { ApiUrlsService } from '@common/services';

import {
  CONFIRM_MATERIAL_REMOVAL_DIALOG_CONFIG,
  CREATE_MATERIAL_DIALOG_CONFIG,
  EDIT_MATERIAL_DIALOG_CONFIG,
} from './constants';

@Injectable()
export class MaterialsService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly formDialogService: DynamicFormDialogService,
    private readonly httpClient: HttpClient,
    private readonly toastr: ToastrService,
  ) { }

  public createMaterial(): Observable<IMaterial | never> {
    return this.formDialogService.openFormDialog(CREATE_MATERIAL_DIALOG_CONFIG)
      .afterClosed()
      .pipe(
        filter((materialDto) => !!materialDto?.name),
        switchMap((materialDto) => this.saveMaterial(materialDto)),
      );
  }

  public deleteMaterial(materialId: string): Observable<void | never> {
    return this.confirmationDialogService.open(CONFIRM_MATERIAL_REMOVAL_DIALOG_CONFIG).confirmed$
      .pipe(
        switchMap(() => {
          const removeUrl = this.apiUrlsService.getMaterialBaseEndpointUrl(materialId);
          return this.httpClient.delete<void>(removeUrl);
        }),
      );
  }

  public updateMaterial(material: Pick<IMaterial, 'id' | 'name'>): Observable<IMaterial | never> {
    return this.formDialogService.openFormDialog(EDIT_MATERIAL_DIALOG_CONFIG, material)
      .afterClosed()
      .pipe(
        filter((materialDto) => materialDto),
        switchMap((materialDto) => this.saveMaterial({ name: materialDto.name, id: material.id })),
      );
  }

  public saveMaterial(material: Partial<IMaterial>): Observable<IMaterial | never> {
    const updateUrl = this.apiUrlsService.getMaterialsBaseEndpointUrl();
    return this.httpClient.put<IMaterial>(updateUrl, material)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.error?.message || DEFAULT_ERROR_MESSAGE);
          return EMPTY;
        }),
      );
  }
}
