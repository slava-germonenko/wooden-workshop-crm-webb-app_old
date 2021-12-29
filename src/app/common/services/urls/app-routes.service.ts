import { Injectable } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppRoutesService {
  public constructor(
    private readonly router: Router,
    private readonly urlSerializer: UrlSerializer,
  ) { }

  public getContactsPageRouter(): string {
    return this.serializeRoute(['contacts']);
  }

  public getDashboardPageRoute(): string {
    return this.serializeRoute(['dashboard']);
  }

  public getLoginPageRoute(redirectUrl?: string): string {
    const queryParams = redirectUrl ? { redirectUrl } : undefined;
    return this.urlSerializer.serialize(
      this.router.createUrlTree(['login'], { queryParams }),
    );
  }

  public getLogoutPageRoute(): string {
    return this.serializeRoute(['logout']);
  }

  public getProfilePageRoute(): string {
    return this.serializeRoute(['profile']);
  }

  private serializeRoute(commands: (string | number)[]): string {
    return this.urlSerializer.serialize(
      this.router.createUrlTree(commands),
    );
  }
}
