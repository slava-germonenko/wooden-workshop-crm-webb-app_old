import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Permissions } from '@common/enums';
import { IUser } from '@common/interfaces';
import { ApiUrlsService } from '@common/services/urls';

@Injectable({ providedIn: 'root' })
export class UserService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getCurrentUser(): Observable<IUser> {
    return this.httpClient.get<IUser>(
      this.apiUrlsService.getCurrentUserEndpointUrl(),
    );
  }

  public getUserPermissions(userId: string): Observable<Permissions[]> {
    const permissionsEndpointUrl = this.apiUrlsService.getGetProfileEndpointUrl(userId);
    return this.httpClient.get<{ permissions: Permissions[] }>(permissionsEndpointUrl)
      .pipe(
        map(({ permissions }) => permissions),
      );
  }
}
