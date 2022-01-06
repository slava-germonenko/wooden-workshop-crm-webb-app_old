import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, take } from 'rxjs';

import { IUser } from '@common/interfaces/models';

import { ProfileService } from '../services';

@Injectable()
export class ProfileResolver implements Resolve<IUser> {
  public constructor(private readonly profileService: ProfileService) { }

  public resolve(): Observable<IUser> {
    return this.profileService.getCurrentUserProfile()
      .pipe(
        take(1),
      );
  }
}
