import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  ActivityLevelState,
  activityLevelAdapter,
} from './activity-level.reducer';

const { selectAll } = activityLevelAdapter.getSelectors();

export const selectActivityLevelFeature =
  createFeatureSelector<ActivityLevelState>('activityLevel');

export const selectActivityLevels = createSelector(
  selectActivityLevelFeature,
  selectAll
);
