import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '@common/interfaces/models';
import {
  IOrderByQuery,
  IPage,
  IPagedCollection,
  IUsersFilter,
} from '@common/interfaces';
import { ObjectsHelper } from '@common/helpers';
import { ApiUrlsService } from '@common/services';
import { UserOrderField } from '@common/types';

@Injectable({ providedIn: 'root' })
export class UsersListService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getUsersList(
    page: IPage,
    filter?: IUsersFilter,
    order?: IOrderByQuery<UserOrderField>,
  ): Observable<IPagedCollection<IUser>> {
    const queryParamObject = {
      ...page,
      ...filter ?? {},
      ...order ?? {},
    };

    const queryParams = new HttpParams({
      fromObject: ObjectsHelper.createClean(queryParamObject),
    });

    return this.httpClient.get<IPagedCollection<IUser>>(
      this.apiUrlsService.getUsersEndpointUrl(),
      { params: queryParams },
    );
  }
}
