import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  combineLatest,
  interval,
  filter,
  switchMap, tap,
} from 'rxjs';

import { REFRESH_TOKEN_INTERVAL } from '@app/common/constants';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserSessionService implements OnDestroy {
  private readonly userSessionIsAliveSource = new BehaviorSubject<boolean>(false);

  public readonly userSessionIsAlive$ = this.userSessionIsAliveSource.asObservable();

  private refreshTokenSubscription: Subscription | null = null;

  public constructor(private readonly userService: UserService) { }

  public startUserSession(): void {
    this.userSessionIsAliveSource.next(true);
    this.refreshTokenSubscription = this.createRefreshTokenStream();
  }

  public destroyUserSession(): void {
    this.userSessionIsAliveSource.next(false);
    this.destroyRefreshTokenSubscription();
  }

  public ngOnDestroy(): void {
    this.destroyRefreshTokenSubscription();
  }

  private createRefreshTokenStream(): Subscription {
    return combineLatest([this.userSessionIsAlive$, interval(REFRESH_TOKEN_INTERVAL)])
      .pipe(
        filter(([sessionIsAlive]) => sessionIsAlive),
        switchMap(() => this.userService.refreshUserSession()),
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
