import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPage, IPagedCollection } from '@common/interfaces';
import { ICategory } from '@common/interfaces/models';
import { ApiUrlsService } from '@common/services/urls';

@Injectable({ providedIn: 'root' })
export class CategoriesListService {
  public constructor(
    private readonly apiUrlService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getCategoriesPage(page: IPage, search?: string): Observable<IPagedCollection<ICategory>> {
    let params = new HttpParams()
      .set('size', page.size)
      .set('index', page.index);

    if (search?.length) {
      params = params.set('search', search);
    }

    return this.httpClient.get<IPagedCollection<ICategory>>(
      this.apiUrlService.getCategoriesBaseEndpointUrl(),
      { params },
    );
  }
}
