import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  catchError,
  map,
  Observable,
  of,
} from 'rxjs';

import { UserStateService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class UnauthorizedGuard implements CanActivate {
  public constructor(
    private readonly router: Router,
    private readonly userStateService: UserStateService,
  ) { }

  public canActivate(): Observable<boolean | UrlTree> {
    return this.userStateService.currentUser$
      .pipe(
        map((user) => (user ? this.buildRedirectRoute() : true)),
        catchError(() => of(true)),
      );
  }

  private buildRedirectRoute(): UrlTree {
    return this.router.createUrlTree(['']);
  }
}
