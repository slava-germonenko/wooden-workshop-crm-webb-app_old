import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { ISession, IUser } from '@common/interfaces';

import { PROFILE_FORM_FIELDS } from './constants';
import { ProfilePageStateService } from './services';

@Component({
  selector: 'ww-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  providers: [ProfilePageStateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @HostBinding('class')
  public hostClasses = ['pad-page-content'];

  public readonly profileFormFields = [...PROFILE_FORM_FIELDS];

  public activeSessions$ = this.profileStateService.activeSessions$;

  public profile$ = this.profileStateService.profile$;

  public get currentSession(): ISession {
    return this.profileStateService.currentSession;
  }

  public constructor(private readonly profileStateService: ProfilePageStateService) { }

  public expireSession(session: ISession): void {
    this.profileStateService.expireSession(session);
  }

  public updateProfile(profileObject: Record<string, any>): void {
    this.profileStateService.updateProfile(profileObject as IUser);
  }
}
