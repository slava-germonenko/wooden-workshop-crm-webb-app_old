import { createAction, props } from '@ngrx/store';

export const loadProfile = createAction('[Profile] Load Profile');

export const profileLoaded = createAction(
  '[Profile] Profile Loaded',
  props<{ userId: string, firstName: string, lastName: string, emailAddress: string }>(),
);

export const profileUpdated = createAction('[Profile] Profile Updated');

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ userId: string, firstName: string, lastName: string, emailAddress: string }>(),
);
