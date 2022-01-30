import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {
  Observable,
  filter,
  switchMap,
  tap,
} from 'rxjs';

import { DynamicFormDialogService } from '@framework/dynamic-form-dialog';
import { FilePickerDialogService } from '@framework/file-picker-dialog';
import { ToastrService } from '@framework/toastr';
import { ALLOWED_ASSET_FILE_EXTENSIONS, DEFAULT_ERROR_MESSAGE } from '@common/constants';
import { IPage, IPagedCollection } from '@common/interfaces';
import { IAsset } from '@common/interfaces/models';
import { ApiUrlsService } from '@common/services';

import { RENAME_ASSET_DIALOG_CONFIG } from './constants';
import { FolderPickerDialogComponent } from '../folder-picker-dialog/folder-picker-dialog.component';

@Injectable()
export class AssetsService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly dialog: MatDialog,
    private readonly filePickerDialogService: FilePickerDialogService,
    private readonly formDialogService: DynamicFormDialogService,
    private readonly httpClient: HttpClient,
    private readonly toastrService: ToastrService,
  ) { }

  public createAssets(folderId?: string): Observable<IAsset[] | never> {
    return this.filePickerDialogService
      .open({ allowedFileTypes: [...ALLOWED_ASSET_FILE_EXTENSIONS] })
      .submitted$
      .pipe(
        switchMap((files) => this.uploadAssets(files, folderId)),
      );
  }

  public getAssetsList(page: IPage, folderId?: string): Observable<IPagedCollection<IAsset>> {
    let params = new HttpParams()
      .set('size', page.size)
      .set('index', page.index);

    if (folderId) {
      params = params.set('folderId', folderId);
    }

    return this.httpClient.get<IPagedCollection<IAsset>>(
      this.apiUrlsService.getAssetsBaseEndpointsUrl(),
      { params },
    );
  }

  public moveAsset(asset: IAsset): Observable<IAsset | never> {
    return this.dialog.open(FolderPickerDialogComponent)
      .afterClosed()
      .pipe(
        filter((folderData) => !!folderData),
        switchMap(({ folderId }) => this.updateAssetDetails({ ...asset, folderId })),
      );
  }

  public removeAssets(assetIds: string[]): Observable<void> {
    return this.httpClient.patch<void>(
      this.apiUrlsService.getAssetsBaseEndpointsUrl(),
      { assetIds },
    );
  }

  public renameAsset(assetToRename: IAsset): Observable<IAsset | never> {
    return this.formDialogService.openFormDialog(
      RENAME_ASSET_DIALOG_CONFIG,
      { assetName: assetToRename.assetName },
    )
      .afterClosed()
      .pipe(
        filter((asset) => !!asset),
        switchMap(({ assetName }) => this.updateAssetDetails({ ...assetToRename, assetName })),
        tap({
          error: (err: HttpErrorResponse) => this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE),
        }),
      );
  }

  public updateAssetDetails(asset: IAsset): Observable<IAsset> {
    return this.httpClient.put<IAsset>(
      this.apiUrlsService.getAssetsBaseEndpointsUrl(),
      asset,
    );
  }

  public uploadAssets(files: File[], folderId?: string): Observable<IAsset[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append(file.name, file, file.name));

    const requestUrl = folderId
      ? this.apiUrlsService.getFolderAssetsEndpointUrl(folderId)
      : this.apiUrlsService.getAssetsBaseEndpointsUrl();
    return this.httpClient.post<IAsset[]>(
      requestUrl,
      formData,
    );
  }
}
