import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Observable,
  map,
  switchMap,
  tap,
} from 'rxjs';

import { ToastrService } from '@framework/toastr';
import { ISession } from '@common/interfaces';
import { ApiUrlsService } from '@common/services/urls';
import { UserStateService } from '@common/services/user';

@Injectable()
export class SessionsService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly toastrService: ToastrService,
    private readonly userStateService: UserStateService,
  ) { }

  public getCurrentUserSessions(): Observable<ISession[]> {
    return this.userStateService.currentUser$
      .pipe(
        switchMap((user) => this.getUserSessions(user.id)),
      );
  }

  public getCurrentSession(): Observable<ISession> {
    return this.httpClient.get<ISession>(
      this.apiUrlsService.getCurrentSessionEndpointUrl(),
    );
  }

  private getUserSessions(userId: string): Observable<ISession[]> {
    return this.httpClient.get<{ sessions: ISession[] }>(
      this.apiUrlsService.getUserSessionsEndpointUrl(userId),
    ).pipe(
      map(({ sessions }) => sessions),
    );
  }

  public expireSession(session: Pick<ISession, 'id'>): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiUrlsService.getSessionEndpointUrl(session.id),
    ).pipe(
      tap({
        error: (err: HttpErrorResponse) => this.toastrService.error(
          err.error?.message ?? `Произошла ошибка при попытке завершить сессию ${session.id}.`,
        ),
      }),
    );
  }
}
