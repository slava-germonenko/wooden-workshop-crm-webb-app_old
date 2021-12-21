import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

import { UserSessionService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuard implements CanActivate {
  public constructor(
    private readonly router: Router,
    private readonly userSessionService: UserSessionService,
  ) { }

  public canActivate(): Observable<boolean | UrlTree> {
    return this.userSessionService.userSessionIsAlive$
      .pipe(
        map((isAlive) => isAlive || this.buildRedirectRoute()),
      );
  }

  private buildRedirectRoute(): UrlTree {
    return this.router.createUrlTree(['login']);
  }
}
