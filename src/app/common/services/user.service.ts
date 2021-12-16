import { Injectable } from '@angular/core';
import {
  map,
  Observable,
  of,
  shareReplay,
} from 'rxjs';

import { Permissions } from '@common/enums';
import { IUser } from '@common/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '@common/services/urls';

@Injectable({ providedIn: 'root' })
export class UserService {
  public readonly currentUser$: Observable<IUser> = this.httpClient
    .get<IUser>(this.apiUrlsService.getCurrentUserEndpointUrl())
    .pipe(
      shareReplay(1),
    );

  public readonly currentUserPermissions$: Observable<Permissions[]> = of([]);

  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public userHasPermissionAsync(permission: Permissions): Observable<boolean> {
    return this.currentUserPermissions$
      .pipe(
        map((currentUserPerms) => currentUserPerms.includes(permission)),
      );
  }

  public userHasAnyOfPermissionsAsync(permissios: Permissions[]): Observable<boolean> {
    return this.currentUserPermissions$
      .pipe(
        map((currentUserPerms) => currentUserPerms.some((p) => permissios.includes(p))),
      );
  }

  public userHasPermissionsAsync(permissions: Permissions[]): Observable<boolean> {
    return this.currentUserPermissions$
      .pipe(
        map((currentUserPerms) => {
          return permissions
            .filter((p) => currentUserPerms.includes(p))
            .length === permissions.length;
        }),
      );
  }
}
