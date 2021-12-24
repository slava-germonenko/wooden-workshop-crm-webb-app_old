import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Permissions } from '@common/enums';
import { UserStateService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class PermissionsGuard implements CanActivate {
  public constructor(
    private readonly userStateService: UserStateService,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const routePermissions = route.data['permissions'] as Permissions[] | undefined;
    if (!routePermissions) {
      return of(true);
    }

    return this.userStateService.userHasAnyOfPermissionsAsync(routePermissions);
  }
}
