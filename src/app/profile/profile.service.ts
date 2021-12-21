import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';

import { ToastrService } from '@framework/toastr';
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';
import { ApiUrlsService, UserStateService } from '@common/services';
import { IProfile } from '@common/interfaces';

@Injectable()
export class ProfileService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly toastrService: ToastrService,
    private readonly userStateService: UserStateService,
  ) { }

  public getCurrentUserProfile(): Observable<IProfile> {
    return this.userStateService.currentUser$
      .pipe(
        switchMap(({ id }) => this.getUserProfile(id)),
      );
  }

  public updateProfile(profile: IProfile): Observable<IProfile> {
    return this.httpClient.patch<IProfile>(
      this.apiUrlsService.getUpdateProfileEndpointUrl(),
      profile,
    )
      .pipe(
        tap({
          next: () => this.toastrService.success('Профиль был успешно обновлён'),
          error: (err: HttpErrorResponse) => this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE),
        }),
      );
  }

  private getUserProfile(userId: string): Observable<IProfile> {
    return this.httpClient.get<IProfile>(
      this.apiUrlsService.getGetProfileEndpointUrl(userId),
    );
  }
}
