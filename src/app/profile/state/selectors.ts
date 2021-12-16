import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProfileState } from '@app/profile';

export const selectProfileState = createFeatureSelector<IProfileState>('profile');

export const selectProfile = createSelector(
  selectProfileState,
  (state: IProfileState) => state.profile,
);
