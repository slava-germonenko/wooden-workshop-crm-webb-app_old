import { Component, OnInit } from '@angular/core';

import { IUser } from '@common/interfaces/models';

import { PROFILE_FORM_FIELDS } from './constants';
import { ProfileService } from './profile.service';

@Component({
  selector: 'ww-profile',
  templateUrl: 'profile.component.html',
})
export class ProfileComponent implements OnInit {
  public readonly profileFormFields = [...PROFILE_FORM_FIELDS];

  public loading = false;

  public user: IUser | null = null;

  public constructor(private readonly profileService: ProfileService) { }

  public ngOnInit(): void {
    this.profileService
      .getCurrentUserProfile()
      .subscribe((profile) => {
        this.user = profile;
      });
  }

  public updateProfile(profileObj: Record<string, string>): void {
    if (!this.user) {
      return;
    }

    this.loading = true;
    const profile = profileObj as { firstName: string, lastName: string, emailAddress: string };
    this.profileService
      .updateProfile({ ...profile, id: this.user.id })
      .subscribe((updatedProfile) => {
        this.user = updatedProfile;
        this.loading = false;
      });
  }
}
