import { Injectable } from '@angular/core';
import { UserService } from '@common/services';
import { Permissions } from '@common/enums';
import {
  Observable,
  map,
  shareReplay,
  switchMap, BehaviorSubject,
} from 'rxjs';

import { IUser } from '@common/interfaces';
import { ArrayHelper } from '@common/helpers';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private readonly userIsAuthorizedSource = new BehaviorSubject<boolean>(false);

  public readonly userIsAuthorized$: Observable<boolean> = this.userIsAuthorizedSource.asObservable();

  public readonly currentUser$: Observable<IUser> = this.userIsAuthorized$
    .pipe(
      switchMap(() => this.userService.getCurrentUser()),
      shareReplay(1),
    );

  public readonly currentUserPermissions$: Observable<Permissions[]> = this.currentUser$
    .pipe(
      switchMap((user) => this.userService.getUserPermissions(user.id)),
      shareReplay(1),
    );

  public constructor(private readonly userService: UserService) { }

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
