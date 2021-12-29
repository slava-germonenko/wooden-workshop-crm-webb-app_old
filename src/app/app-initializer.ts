import {
  Observable,
  catchError,
  map,
  of,
  tap,
} from 'rxjs';

import { ToolbarService } from '@framework/toolbar';
import { UserSessionService } from '@common/services';

export function initApp(
  toolbarService: ToolbarService,
  userSessionService: UserSessionService,
): Observable<boolean> {
  return userSessionService.refreshUserSession()
    .pipe(
      map(() => true),
      catchError(() => of(false)),
      tap((userIsLoggedIn) => {
        if (userIsLoggedIn) {
          userSessionService.startUserSession();
          toolbarService.showToolbar();
        }
      }),
    );
}
