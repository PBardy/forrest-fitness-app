import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SettingsState } from './settings.reducer';

export const selectSettingsFeature =
  createFeatureSelector<SettingsState>('settings');

export const selectSettings = createSelector(
  selectSettingsFeature,
  (s) => s.settings
);
