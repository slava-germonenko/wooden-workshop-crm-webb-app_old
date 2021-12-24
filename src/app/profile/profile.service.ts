import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ToastrService } from '@framework/toastr';
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';
import { ApiUrlsService, UserStateService } from '@common/services';
import { IUser } from '@common/interfaces/models';

@Injectable()
export class ProfileService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly toastrService: ToastrService,
    private readonly userStateService: UserStateService,
  ) { }

  public getCurrentUserProfile(): Observable<IUser> {
    return this.userStateService.currentUser$;
  }

  public updateProfile(profile: IUser): Observable<IUser> {
    return this.httpClient.patch<IUser>(
      this.apiUrlsService.getUsersEndpointUrl(),
      profile,
    )
      .pipe(
        tap({
          next: () => this.toastrService.success('Профиль был успешно обновлён'),
          error: (err: HttpErrorResponse) => this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE),
        }),
      );
  }
}
