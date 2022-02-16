import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMaterial } from '@common/interfaces/models';
import { IPage, IPagedCollection } from '@common/interfaces';
import { ApiUrlsService } from '@common/services/urls';

@Injectable({ providedIn: 'root' })
export class MaterialsListService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getMaterialsPage(page: IPage, search?: string): Observable<IPagedCollection<IMaterial>> {
    let params = new HttpParams()
      .set('size', page.size)
      .set('index', page.index);

    if (search) {
      params = params.set('search', search);
    }

    return this.httpClient.get<IPagedCollection<IMaterial>>(
      this.apiUrlsService.getMaterialsBaseEndpointUrl(),
      { params },
    );
  }
}
