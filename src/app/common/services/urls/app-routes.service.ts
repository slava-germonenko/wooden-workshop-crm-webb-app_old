import { Injectable } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppRoutesService {
  public constructor(
    private readonly router: Router,
    private readonly urlSerializer: UrlSerializer,
  ) { }

  public getLoginPageRoute(redirectUrl?: string): string {
    const queryParams = redirectUrl ? { redirectUrl } : undefined;
    return this.urlSerializer.serialize(
      this.router.createUrlTree(['login'], { queryParams }),
    );
  }

  public getDashboardPageRoute(): string {
    return this.urlSerializer.serialize(
      this.router.createUrlTree(['dashboard']),
    );
  }
}
