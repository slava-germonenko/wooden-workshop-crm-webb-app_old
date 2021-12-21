import { Component, OnInit } from '@angular/core';

import { IProfile } from '@common/interfaces';

import { PROFILE_FORM_FIELDS } from './constants';
import { ProfileService } from './profile.service';

@Component({
  selector: 'ww-profile',
  templateUrl: 'profile.component.html',
})
export class ProfileComponent implements OnInit {
  public readonly profileFormFields = [...PROFILE_FORM_FIELDS];

  public profile: IProfile | null = null;

  public constructor(private readonly profileService: ProfileService) { }

  public ngOnInit(): void {
    this.profileService
      .getCurrentUserProfile()
      .subscribe((profile) => {
        this.profile = profile;
      });
  }

  public updateProfile(profileObj: Record<string, string>): void {
    if (!this.profile) {
      return;
    }

    const profile = profileObj as { firstName: string, lastName: string, emailAddress: string };
    this.profileService
      .updateProfile({ ...profile, userId: this.profile.userId })
      .subscribe((updatedProfile) => {
        this.profile = updatedProfile;
      });
  }
}
