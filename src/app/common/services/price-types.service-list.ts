import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPriceType } from '@common/interfaces/models';
import { IPage, IPagedCollection } from '@common/interfaces';
import { ApiUrlsService } from '@common/services/urls';

@Injectable({ providedIn: 'root' })
export class PriceTypesServiceList {
  public get priceTypeUrl(): string {
    return this.apiUrlsService.getPriceTypesBaseEndpointUrl();
  }

  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getPriceTypesList(page: IPage, search?: string): Observable<IPagedCollection<IPriceType>> {
    let params = new HttpParams()
      .set('size', page.size)
      .set('index', page.index);

    if (search) {
      params = params.set('search', search);
    }

    return this.httpClient.get<IPagedCollection<IPriceType>>(this.priceTypeUrl, { params });
  }
}
