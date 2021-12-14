import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { Permissions } from '@common/enums';
import { IUser } from '@common/interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
  public readonly currentUser$: Observable<IUser> = of({ id: 'test' });

  public readonly currentUserPermissions$: Observable<Permissions[]> = of([]);

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
