import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProfileState } from './profile.reducer';

export const selectProfileFeature =
  createFeatureSelector<ProfileState>('profile');

export const selectProfile = createSelector(
  selectProfileFeature,
  (s) => s.profile
);
