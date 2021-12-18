import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  Observable,
  catchError,
  map,
  of,
} from 'rxjs';

import { UserStateService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuard implements CanActivate {
  public constructor(
    private readonly router: Router,
    private readonly userStateService: UserStateService,
  ) { }

  public canActivate(): Observable<boolean | UrlTree> {
    return this.userStateService.currentUser$
      .pipe(
        map((user) => (user ? true : this.buildRedirectRoute())),
        catchError(() => of(this.buildRedirectRoute())),
      );
  }

  private buildRedirectRoute(): UrlTree {
    return this.router.createUrlTree(['login']);
  }
}
