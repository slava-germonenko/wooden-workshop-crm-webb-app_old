import {
  Observable,
  catchError,
  map,
  of, tap,
} from 'rxjs';

import { ToolbarService } from '@framework/toolbar';
import { UserService, UserSessionService } from '@common/services';

export function initApp(
  toolbarService: ToolbarService,
  userService: UserService,
  userSessionService: UserSessionService,
): Observable<boolean> {
  return userService.refreshUserSession()
    .pipe(
      map(() => true),
      catchError(() => of(false)),
      tap((userIsLoggedIn) => {
        // eslint-disable-next-line no-param-reassign
        toolbarService.toolbarVisible = userIsLoggedIn;
        if (userIsLoggedIn) {
          userSessionService.startUserSession();
        }
      }),
    );
}
