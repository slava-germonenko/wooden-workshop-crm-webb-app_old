import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { IAuthorizationResult } from '@common/interfaces';
import { ToolbarService } from '@framework/toolbar';
import { ToastrService } from '@framework/toastr';
import { ApiUrlsService, UserService } from '@common/services';
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';

@Injectable()
export class LoginService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly toastr: ToastrService,
    private readonly toolbarService: ToolbarService,
    private readonly userService: UserService,
  ) { }

  public login(username: string, password: string): Observable<IAuthorizationResult> {
    return this.httpClient.post<IAuthorizationResult>(
      this.apiUrlsService.getAuthorizationEndpointUrl(),
      { username, password },
    ).pipe(
      tap({
        next: (result) => {
          this.userService.setAuthorizationTokenCookie(result.accessToken, result.expiresIn);
          this.toolbarService.toolbarVisible = true;
        },
        error: (error: HttpErrorResponse) => this.toastr.error(error.error.message ?? DEFAULT_ERROR_MESSAGE),
      }),
    );
  }
}
