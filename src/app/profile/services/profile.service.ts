import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { IUser } from '@common/interfaces';
import { ApiUrlsService, UserService } from '@common/services';

import { IProfile } from '../interfaces';

@Injectable()
export class ProfileService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly userService: UserService,
  ) { }

  public getCurrentUserProfile(): Observable<IProfile> {
    return this.userService.currentUser$
      .pipe(
        switchMap((user: IUser) => this.httpClient.get<IProfile>(
          this.apiUrlsService.getGetProfileEndpointUrl(user.id),
        )),
      );
  }

  public updateUserProfile(profile: IProfile): Observable<IProfile> {
    return this.httpClient.put<IProfile>(
      this.apiUrlsService.getUpdateProfileEndpointUrl(),
      profile,
    );
  }
}
