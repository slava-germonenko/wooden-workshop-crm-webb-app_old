import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IToolbarState } from '../interfaces';

const selectToolbar = createFeatureSelector<IToolbarState>('toolbar');

export const selectVisible = createSelector(
  selectToolbar,
  (state: IToolbarState): boolean => state.visible,
);
