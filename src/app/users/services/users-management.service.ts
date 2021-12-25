import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ToastrService } from '@framework/toastr';

import { IUser } from '@common/interfaces';
import { ApiUrlsService } from '@common/services';
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';

@Injectable()
export class UsersManagementService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly toastrService: ToastrService,
  ) { }

  public createUser(user: Omit<IUser, 'id'> & { password: string }): Observable<IUser> {
    return this.httpClient.post<IUser>(
      this.apiUrlsService.getUsersEndpointUrl(),
      user,
    ).pipe(
      tap({
        next: () => this.toastrService.success('Пользователь был успешно добавлен.'),
        error: (error: HttpErrorResponse) => this.toastrService.error(error.error?.message ?? DEFAULT_ERROR_MESSAGE),
      }),
    );
  }
}
