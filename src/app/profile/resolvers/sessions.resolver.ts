import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, take } from 'rxjs';

import { ISession } from '@common/interfaces';

import { SessionsService } from '../services';

@Injectable()
export class SessionsResolver implements Resolve<ISession[]> {
  public constructor(private readonly sessionsService: SessionsService) { }

  public resolve(): Observable<ISession[]> {
    return this.sessionsService.getCurrentUserSessions()
      .pipe(
        take(1),
      );
  }
}
