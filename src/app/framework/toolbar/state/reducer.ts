import { createReducer, on } from '@ngrx/store';

import { hideToolbar, showToolbar } from './actions';
import { IToolbarState } from '../interfaces';

const INITIAL_TOOLBAR_STATE: IToolbarState = {
  visible: true,
};

export const toolbarReducer = createReducer(
  INITIAL_TOOLBAR_STATE,
  on(hideToolbar, (state): IToolbarState => ({ ...state, visible: false })),
  on(showToolbar, (state): IToolbarState => ({ ...state, visible: false })),
);
