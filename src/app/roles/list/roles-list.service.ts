import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IOrderByQuery,
  IPage,
  IPagedCollection,
  IRole,
  IRolesFilter,
} from '@common/interfaces';
import { ObjectsHelper } from '@common/helpers';
import { ApiUrlsService } from '@common/services';
import { RolesOrderField } from '@app/roles/types';

@Injectable()
export class RolesListService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getRolesList(
    page: IPage,
    filter?: IRolesFilter,
    order?: IOrderByQuery<RolesOrderField>,
  ): Observable<IPagedCollection<IRole>> {
    const queryParamObject = {
      ...page,
      ...filter ?? {},
      ...order ?? {},
    };

    const queryParams = new HttpParams({
      fromObject: ObjectsHelper.createClean(queryParamObject),
    });

    return this.httpClient.get<IPagedCollection<IRole>>(
      this.apiUrlsService.getRolesEndpointUrl(),
      { params: queryParams },
    );
  }
}
