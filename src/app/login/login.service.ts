import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ToolbarService } from '@framework/toolbar';
import { IAuthorizationResult } from '@common/interfaces';
import { ApiUrlsService, UserService } from '@common/services';

@Injectable()
export class LoginService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly toolbarService: ToolbarService,
    private readonly userService: UserService,
  ) { }

  public login(username: string, password: string): Observable<IAuthorizationResult> {
    return this.httpClient.post<IAuthorizationResult>(
      this.apiUrlsService.getAuthorizationEndpointUrl(),
      { username, password },
    ).pipe(
      tap((result) => {
        this.userService.setAuthorizationTokenCookie(result.refreshToken, result.expiresIn);
        this.toolbarService.toolbarVisible = true;
      }),
    );
  }
}
