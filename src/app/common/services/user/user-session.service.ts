import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  Observable,
  combineLatest,
  interval,
  filter,
  switchMap,
  tap,
} from 'rxjs';

import { REFRESH_TOKEN_INTERVAL } from '@common/constants';
import { IAuthorizationResult } from '@common/interfaces';

import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserSessionService implements OnDestroy {
  private readonly userSessionIsAliveSource = new BehaviorSubject<boolean>(false);

  public readonly userSessionIsAlive$ = this.userSessionIsAliveSource.asObservable();

  private refreshTokenSubscription: Subscription | null = null;

  public constructor(private readonly userService: UserService) { }

  public startUserSession(): void {
    this.userSessionIsAliveSource.next(true);
    this.refreshTokenSubscription = this.createRefreshSessionStream();
  }

  public destroyUserSession(): void {
    this.userSessionIsAliveSource.next(false);
    this.destroyRefreshTokenSubscription();
  }

  public refreshUserSession(): Observable<IAuthorizationResult> {
    return this.userService.refreshToken()
      .pipe(
        tap((result: IAuthorizationResult) => {
          this.userService.setAuthorizationTokenCookie(result.accessToken, result.expiresIn);
        }),
      );
  }

  public ngOnDestroy(): void {
    this.destroyRefreshTokenSubscription();
  }

  private createRefreshSessionStream(): Subscription {
    return combineLatest([this.userSessionIsAlive$, interval(REFRESH_TOKEN_INTERVAL)])
      .pipe(
        filter(([sessionIsAlive]) => sessionIsAlive),
        switchMap(() => this.refreshUserSession()),
        tap({
          error: () => this.destroyUserSession(),
        }),
      )
      .subscribe();
  }

  private destroyRefreshTokenSubscription(): void {
    this.refreshTokenSubscription?.unsubscribe();
    this.refreshTokenSubscription = null;
  }
}
