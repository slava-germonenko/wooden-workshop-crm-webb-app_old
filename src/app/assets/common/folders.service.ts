import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {
  Observable,
  filter,
  switchMap,
  tap,
} from 'rxjs';

import { ConfirmationDialogService } from '@framework/confirmation-dialog';
import { DynamicFormDialogService } from '@framework/dynamic-form-dialog';
import { ToastrService } from '@framework/toastr';
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';
import { IPage, IPagedCollection } from '@common/interfaces';
import { IFolder } from '@common/interfaces/models';
import { ApiUrlsService } from '@common/services';

import { ADD_FOLDER_DIALOG_CONFIG, RENAME_FOLDER_DIALOG_CONFIG } from './constants';
import { FolderPickerDialogComponent } from '../folder-picker-dialog/folder-picker-dialog.component';

@Injectable()
export class FoldersService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly dialog: MatDialog,
    private readonly formDialogService: DynamicFormDialogService,
    private readonly httpClient: HttpClient,
    private readonly toastrService: ToastrService,
  ) { }

  public createFolder(parentFolderId?: string): Observable<IFolder | never> {
    return this.formDialogService.openFormDialog(ADD_FOLDER_DIALOG_CONFIG)
      .afterClosed()
      .pipe(
        filter((folderDetails) => !!folderDetails),
        switchMap(({ name }) => {
          const url = this.apiUrlsService.getFoldersBaseEndpointsUrl();
          return this.httpClient.post<IFolder>(url, { name, parentFolderId });
        }),
        tap({
          error: (err: HttpErrorResponse) => this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE),
        }),
      );
  }

  public getFoldersList(page: IPage, parentFolderId?: string): Observable<IPagedCollection<IFolder>> {
    let params = new HttpParams()
      .set('size', page.size)
      .set('index', page.index);

    if (parentFolderId) {
      params = params.set('parentId', parentFolderId);
    }

    return this.httpClient.get<IPagedCollection<IFolder>>(
      this.apiUrlsService.getFoldersBaseEndpointsUrl(),
      { params },
    );
  }

  public moveFolder(folder: IFolder): Observable<IFolder | never> {
    return this.dialog.open(FolderPickerDialogComponent)
      .afterClosed()
      .pipe(
        filter((folderData) => !!folderData),
        switchMap(({ folderId }) => this.updateFolder({ ...folder, parentFolderId: folderId })),
      );
  }

  public removeFolders(folders: IFolder[]): Observable<void | never> {
    const folderIds = folders.map((folder) => folder.id);
    const folderNames = folders.map((folder) => folder.name);

    return this.confirmationDialogService.open({
      title: 'Удаление папок',
      question: 'Вы действительно хотите удалить содержимое следующих папок вместе с ними?',
      termsList: folderNames,
    }).confirmed$
      .pipe(
        switchMap(() => {
          return this.httpClient.patch<void>(
            this.apiUrlsService.getFoldersBaseEndpointsUrl(),
            { folderIds },
          );
        }),
      );
  }

  public renameFolder(folder: IFolder): Observable<IFolder | never> {
    return this.formDialogService.openFormDialog(RENAME_FOLDER_DIALOG_CONFIG, { name: folder.name })
      .afterClosed()
      .pipe(
        filter((file) => !!file),
        switchMap(({ name }) => this.updateFolder({ ...folder, name })),
        tap({
          error: (err: HttpErrorResponse) => this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE),
        }),
      );
  }

  public updateFolder(folder: IFolder): Observable<IFolder> {
    return this.httpClient.put<IFolder>(
      this.apiUrlsService.getFoldersBaseEndpointsUrl(),
      folder,
    );
  }
}
