import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { ConfirmationDialogService } from '@framework/confirmation-dialog';
import { ISession, IUser } from '@common/interfaces/models';

import { ProfileService } from './profile.service';
import { SessionsService } from './sessions.service';

@Injectable()
export class ProfilePageStateService {
  private readonly activeSessionsSource: BehaviorSubject<ISession[]>;

  private readonly profileSource: BehaviorSubject<IUser>;

  public readonly activeSessions$: Observable<ISession[]>;

  public readonly currentSession: ISession;

  public readonly profile$: Observable<IUser>;

  public constructor(
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly route: ActivatedRoute,
    private readonly profileService: ProfileService,
    private readonly sessionsService: SessionsService,
  ) {
    const profile = this.route.snapshot.data['profile'] as IUser;
    this.profileSource = new BehaviorSubject<IUser>(profile);
    this.profile$ = this.profileSource.asObservable();

    const activeSessions = this.route.snapshot.data['sessions'] as ISession[];
    this.activeSessionsSource = new BehaviorSubject<ISession[]>(activeSessions);
    this.activeSessions$ = this.activeSessionsSource.asObservable();
    this.currentSession = this.route.snapshot.data['currentSession'] as ISession;
  }

  public updateProfile(profile: Omit<IUser, 'id'>): void {
    this.profileService
      .updateProfile({ ...profile, id: this.profileSource.value.id })
      .subscribe((user) => this.profileSource.next(user));
  }

  public expireSession(sessionToExpire: Pick<ISession, 'id'>): void {
    const activeSessions = this.activeSessionsSource.value;
    const sessionToExpireIndex = activeSessions.findIndex((session) => session.id === sessionToExpire.id);
    if (sessionToExpireIndex < 0) {
      return;
    }

    this.sessionsService.expireSession(sessionToExpire)
      .subscribe(() => {
        activeSessions.splice(sessionToExpireIndex, 1);
        this.activeSessionsSource.next(activeSessions);
      });
  }
}
