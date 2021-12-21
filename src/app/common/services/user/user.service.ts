import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { Permissions } from '@common/enums';
import { IAuthorizationResult, IUser } from '@common/interfaces';
import { ApiUrlsService, EnvironmentService } from '@common/services';
import { ACCESS_TOKEN_COOKIE_NAME } from '@common/constants';

@Injectable({ providedIn: 'root' })
export class UserService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly cookieService: CookieService,
    private readonly environmentService: EnvironmentService,
    private readonly httpClient: HttpClient,
  ) { }

  public getCurrentUser(): Observable<IUser> {
    return this.httpClient.get<IUser>(
      this.apiUrlsService.getCurrentUserEndpointUrl(),
    );
  }

  public getUserPermissions(userId: string): Observable<Permissions[]> {
    const permissionsEndpointUrl = this.apiUrlsService.getUserPermissionsEndpointUrl(userId);
    return this.httpClient.get<{ permissions: Permissions[] }>(permissionsEndpointUrl)
      .pipe(
        map(({ permissions }) => permissions),
      );
  }

  public refreshUserSession(): Observable<IAuthorizationResult> {
    return this.httpClient.put<IAuthorizationResult>(
      this.apiUrlsService.getRefreshTokenEndpointUrl(),
      {},
    )
      .pipe(
        tap((result: IAuthorizationResult) => this.setAuthorizationTokenCookie(result.accessToken, result.expiresIn)),
      );
  }

  public getAuthorizationTokenFromCookie(): string | undefined {
    return this.cookieService.get(ACCESS_TOKEN_COOKIE_NAME);
  }

  public removeAuthorizationTokenCookie(): void {
    this.cookieService.delete(ACCESS_TOKEN_COOKIE_NAME);
  }

  public setAuthorizationTokenCookie(refreshToken: string, ttlSeconds: number): void {
    const expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + ttlSeconds);
    this.cookieService.set(ACCESS_TOKEN_COOKIE_NAME, refreshToken, {
      sameSite: 'Strict',
      secure: this.environmentService.isProduction,
      // eslint-disable-next-line no-restricted-globals
      domain: location.hostname,
      expires: expireDate,
    });
  }
}
