import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';
import { of, throwError } from 'rxjs';

import { ToastrModule, ToastrService } from '@framework/toastr';
import { ToolbarService } from '@framework/toolbar';
import { IAuthorizationResult } from '@common/interfaces';
import { ApiUrlsService, AppRoutesService } from '@common/services';
import { UserService, UserSessionService } from '@common/services/user';

import { LoginService } from './login.service';

describe('LoginService', () => {
  const MOCK_AUTH_RESULT: IAuthorizationResult = {
    accessToken: 'access',
    refreshToken: 'refresh',
    tokenType: 'bearer',
    expiresIn: 1,
  };

  const CORRECT_CREDENTIALS = {
    username: 'correct username',
    password: 'correct password',
  };

  const INVALID_CREDENTIALS_ERROR_RESPONSE = new HttpErrorResponse(
    { error: { message: 'Пользователь с такой почтой не существует' } },
  );

  const serviceFactory = createServiceFactory({
    service: LoginService,
    imports: [
      ToastrModule,
    ],
    mocks: [
      ApiUrlsService,
      AppRoutesService,
      Router,
      ToolbarService,
      UserService,
      UserSessionService,
    ],
    providers: [
      mockProvider(HttpClient, {
        post: (url: string, { username, password }: { username: string, password: string }) => {
          if (username === CORRECT_CREDENTIALS.username && password === CORRECT_CREDENTIALS.password) {
            return of(MOCK_AUTH_RESULT);
          }
          return throwError(INVALID_CREDENTIALS_ERROR_RESPONSE);
        },
      }),
    ],
  });

  let loginServiceSpectator: SpectatorService<LoginService>;
  let toastrService: SpyObject<ToastrService>;

  beforeEach(() => {
    loginServiceSpectator = serviceFactory();
    toastrService = loginServiceSpectator.inject(ToastrService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should show error message on error response', () => {
    const toastrSpy = jest.spyOn(toastrService, 'error');

    loginServiceSpectator.service
      .login('wrong username', 'wrong password')
      .subscribe();

    expect(toastrSpy).toBeCalledWith(INVALID_CREDENTIALS_ERROR_RESPONSE.error.message);
  });
});
