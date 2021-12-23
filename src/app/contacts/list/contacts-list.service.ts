import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IContact, IPage, IPagedCollection } from '@common/interfaces';
import { ApiUrlsService } from '@common/services';

import { IContactsFilter } from '../interfaces';

@Injectable()
export class ContactsListService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getContact(page: IPage, filter?: IContactsFilter): Observable<IPagedCollection<IContact>> {
    const queryParamObject = filter ? { ...page, ...filter } : { ...page };
    const query = new HttpParams({
      fromObject: queryParamObject,
    });

    return this.httpClient.get<IPagedCollection<IContact>>(
      this.apiUrlsService.getContactsEndpointUrl(),
      { params: query },
    );
  }
}
