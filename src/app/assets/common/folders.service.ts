import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPage, IPagedCollection } from '@common/interfaces';
import { IFolder } from '@common/interfaces/models';
import { ApiUrlsService } from '@common/services';

@Injectable()
export class FoldersService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public createFolder(folder: Pick<IFolder, 'name' | 'parentFolderId'>): Observable<IFolder> {
    return this.httpClient.post<IFolder>(
      this.apiUrlsService.getFoldersBaseEndpointsUrl(),
      folder,
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

  public removeFolders(folderIds: string[]): Observable<void> {
    return this.httpClient.patch<void>(
      this.apiUrlsService.getFoldersBaseEndpointsUrl(),
      { folderIds },
    );
  }

  public updateFolder(folder: IFolder): Observable<IFolder> {
    return this.httpClient.put<IFolder>(
      this.apiUrlsService.getFoldersBaseEndpointsUrl(),
      folder,
    );
  }
}
