import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ToastrService } from '@framework/toastr';
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
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';

@Injectable()
export class RolesListService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly toastrService: ToastrService,
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

  public createRole(role: Pick<IRole, 'name' | 'permissions'>): Observable<IRole> {
    return this.httpClient.post<IRole>(
      this.apiUrlsService.getRolesEndpointUrl(),
      role,
    )
      .pipe(
        tap({
          error: (err: HttpErrorResponse) => this.toastrService.error(
            err.error?.message ?? DEFAULT_ERROR_MESSAGE,
          ),
          next: () => this.toastrService.success('Роль была успешно создана.'),
        }),
      );
  }
}
