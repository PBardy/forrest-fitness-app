import { Profile } from '@types';
import { createReducer, on } from '@ngrx/store';
import { ProfileActions } from './profile.actions';

export type ProfileState = {
  profile: Profile | null;
};

export const initialProfileState: ProfileState = {
  profile: null,
};

export const profileReducer = createReducer(
  initialProfileState,
  on(ProfileActions.set, (state, { payload }) => {
    return { ...state, profile: payload };
  })
);
