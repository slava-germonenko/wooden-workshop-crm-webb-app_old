import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { ToolbarService } from '@framework/toolbar';
import {
  ApiUrlsService,
  AppRoutesService,
  UserService,
  UserSessionService,
} from '@common/services';

@Injectable()
export class LogoutService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly appRoutesService: AppRoutesService,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly toolbarService: ToolbarService,
    private readonly userService: UserService,
    private readonly userSessionService: UserSessionService,
  ) { }

  public logout(): Observable<boolean> {
    return this.httpClient.put(
      this.apiUrlsService.getExpireTokenEndpointUrl(),
      {},
    )
      .pipe(
        tap(() => {
          this.toolbarService.toolbarVisible = false;
          this.userSessionService.destroyUserSession();
          this.userService.removeAuthorizationTokenCookie();
          this.router.navigateByUrl(
            this.appRoutesService.getLoginPageRoute(),
          );
        }),
        map(() => true),
      );
  }
}
