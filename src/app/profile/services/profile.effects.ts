import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, Observable } from 'rxjs';

import { IProfile } from '../interfaces';
import { ProfileService } from './profile.service';
import {
  loadProfile,
  profileLoaded,
  profileUpdated,
  updateProfile,
} from '../state';

@Injectable()
export class ProfileEffects {
  constructor(
    private readonly actions: Actions,
    private readonly profileService: ProfileService,
  ) {
    this.createLoadProfileEffect();
    this.createUpdateProfileEffect();
  }

  private createLoadProfileEffect(): Observable<IProfile> {
    return createEffect(() => {
      return this.actions
        .pipe(
          ofType(loadProfile),
          exhaustMap(() => this.profileService.getCurrentUserProfile()),
          map((profile: IProfile) => profileLoaded(profile)),
        );
    });
  }

  private createUpdateProfileEffect(): Observable<{}> {
    return createEffect(() => {
      return this.actions
        .pipe(
          ofType(updateProfile),
          exhaustMap((action) => this.profileService.updateUserProfile(action)),
          map(() => profileUpdated()),
        );
    });
  }
}
