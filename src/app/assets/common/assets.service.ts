import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPage, IPagedCollection } from '@common/interfaces';
import { IAsset } from '@common/interfaces/models';
import { ApiUrlsService } from '@common/services';

@Injectable()
export class AssetsService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

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

  public removeAssets(assetIds: string[]): Observable<void> {
    return this.httpClient.patch<void>(
      this.apiUrlsService.getAssetsBaseEndpointsUrl(),
      { assetIds },
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
