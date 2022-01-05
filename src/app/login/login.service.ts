import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { ToolbarService } from '@framework/toolbar';
import { ToastrService } from '@framework/toastr';
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';
import { BrowserHelper } from '@common/helpers';
import { IAuthorizationResult } from '@common/interfaces';
import { ApiUrlsService, AppRoutesService } from '@common/services/urls';
import { UserService, UserSessionService } from '@common/services/user';

@Injectable()
export class LoginService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly appRoutesService: AppRoutesService,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly toolbarService: ToolbarService,
    private readonly userService: UserService,
    private readonly userSessionService: UserSessionService,
  ) { }

  public login(username: string, password: string): Observable<IAuthorizationResult> {
    const deviceInformation = BrowserHelper.getDeviceAndBrowserInformation();
    return this.httpClient.post<IAuthorizationResult>(
      this.apiUrlsService.getAuthorizationEndpointUrl(),
      { username, password, device: deviceInformation },
    ).pipe(
      tap({
        next: (result) => {
          this.userService.setAuthorizationTokenCookie(result.accessToken, result.expiresIn);
          this.userSessionService.startUserSession();
          this.toolbarService.showToolbar();
          // TODO: Once dashboard is implemented, navigate to it instead of profile page.
          this.router.navigateByUrl(
            this.appRoutesService.getProfilePageRoute(),
          );
        },
        error: (error: HttpErrorResponse) => this.toastr.error(error.error.message ?? DEFAULT_ERROR_MESSAGE),
      }),
    );
  }
}
