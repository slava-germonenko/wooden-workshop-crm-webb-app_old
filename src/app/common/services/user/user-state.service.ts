import { Injectable } from '@angular/core';
import {
  Observable,
  map,
  shareReplay,
  switchMap,
  filter,
} from 'rxjs';

import { Permissions } from '@common/enums';
import { ArrayHelper } from '@common/helpers';
import { IUser } from '@common/interfaces';
import { UserService, UserSessionService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  public readonly currentUser$: Observable<IUser> = this.userSessionService.userSessionIsAlive$
    .pipe(
      filter((isLoggedIn) => isLoggedIn),
      switchMap(() => this.userService.getCurrentUser()),
      shareReplay(1),
    );

  public readonly currentUserPermissions$: Observable<Permissions[]> = this.currentUser$
    .pipe(
      switchMap((user) => this.userService.getUserPermissions(user.id)),
      shareReplay(1),
    );

  public constructor(
    private readonly userService: UserService,
    private readonly userSessionService: UserSessionService,
  ) { }

  public userHasPermissionAsync(permission: Permissions): Observable<boolean> {
    return this.currentUserPermissions$
      .pipe(
        map((currentUserPerms) => currentUserPerms.includes(permission)),
      );
  }

  public userHasAnyOfPermissionsAsync(permissions: Permissions[]): Observable<boolean> {
    return this.currentUserPermissions$
      .pipe(
        map((currentUserPerms) => ArrayHelper.haveIntersection(permissions, currentUserPerms)),
      );
  }

  public userHasPermissionsAsync(permissions: Permissions[]): Observable<boolean> {
    return this.currentUserPermissions$
      .pipe(
        map((currentUserPerms) => {
          return ArrayHelper.getIntersection(currentUserPerms, permissions).length === permissions.length;
        }),
      );
  }
}
