import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiUrlsService } from '@common/services';
import { IPage, IPagedCollection, IUsersFilter } from '@common/interfaces';
import { IUser } from '@common/interfaces/models';

@Injectable({ providedIn: 'root' })
export class UsersListService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getUsersList(page: IPage, filter?: IUsersFilter): Observable<IPagedCollection<IUser>> {
    const queryParams = new HttpParams({
      fromObject: {
        ...page, ...filter ?? {},
      },
    });

    return this.httpClient.get<IPagedCollection<IUser>>(
      this.apiUrlsService.getUsersEndpointUrl(),
      { params: queryParams },
    );
  }
}
