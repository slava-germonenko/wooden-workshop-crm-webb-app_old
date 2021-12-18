import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';

import { AppRoutesService, UserService } from '@common/services';
import { Permissions } from '@common/enums';
import { IUser } from '@common/interfaces';
import { ArrayHelper } from '@common/helpers';
import { ToolbarService } from '@framework/toolbar/toolbar.service';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  public readonly currentUser$: Observable<IUser> = this.userService.getCurrentUser()
    .pipe(
      shareReplay(1),
    );

  public readonly currentUserPermissions$: Observable<Permissions[]> = this.currentUser$
    .pipe(
      switchMap((user) => this.userService.getUserPermissions(user.id)),
      shareReplay(1),
    );

  public constructor(
    private readonly appRoutesService: AppRoutesService,
    private readonly router: Router,
    private readonly toolbarService: ToolbarService,
    private readonly userService: UserService,
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
