import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ISession } from '@common/interfaces/models';
import { SessionsService } from '@app/profile/services';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentSessionResolver implements Resolve<ISession> {
  public constructor(private readonly sessionsService: SessionsService) { }

  public resolve(): Observable<ISession> {
    return this.sessionsService.getCurrentSession();
  }
}
