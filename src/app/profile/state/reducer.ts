import { createReducer, on } from '@ngrx/store';

import { profileLoaded } from './actions';
import { IProfileState } from '../interfaces';

const INITIAL_STATE: IProfileState = {
  profile: undefined,
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(profileLoaded, (state, profile): IProfileState => ({ ...state, profile })),
);
