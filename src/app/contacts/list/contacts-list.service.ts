import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ObjectsHelper } from '@common/helpers';
import { IContact } from '@common/interfaces/models';
import { IOrderByQuery, IPage, IPagedCollection } from '@common/interfaces';
import { ApiUrlsService } from '@common/services';

import { IContactsFilter } from '../interfaces';
import { ContactsOrderField } from '../types';

@Injectable()
export class ContactsListService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getContact(
    page: IPage,
    filter?: IContactsFilter,
    order?: IOrderByQuery<ContactsOrderField>,
  ): Observable<IPagedCollection<IContact>> {
    const queryParamObject = {
      ...page,
      ...filter ?? {},
      ...order ?? {},
    };
    const query = new HttpParams({
      fromObject: ObjectsHelper.createClean(queryParamObject),
    });

    return this.httpClient.get<IPagedCollection<IContact>>(
      this.apiUrlsService.getContactsEndpointUrl(),
      { params: query },
    );
  }
}
