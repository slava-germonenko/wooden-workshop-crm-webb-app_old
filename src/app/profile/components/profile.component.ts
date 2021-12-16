import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';

import { IDynamicFormField } from '@framework/dynamic-form';

import { PROFILE_FORM_FIELDS } from '../constants';
import { IProfile } from '../interfaces';
import { loadProfile, selectProfile, updateProfile } from '../state';

@Component({
  selector: 'ww-profile',
  templateUrl: 'profile.component.html',
})
export class ProfileComponent implements OnInit {
  private currentUserId?: string;

  // @ts-ignore
  public readonly currentUserProfile$: Observable<IProfile> = this.store.select(selectProfile)
    .pipe(
      filter((profile) => !!profile),
    );

  public readonly profileFormFields: IDynamicFormField[] = [...PROFILE_FORM_FIELDS];

  public constructor(private readonly store: Store) { }

  public ngOnInit(): void {
    this.store.dispatch(loadProfile());
  }

  public submitProfileUpdate(formValue: unknown): void {
    if (this.currentUserId) {
      this.store.dispatch(
        updateProfile({ ...formValue as IProfile, userId: this.currentUserId }),
      );
    }
  }
}
