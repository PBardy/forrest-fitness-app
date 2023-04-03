import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ActivityState, activityAdapter } from './activity.reducer';
import * as _ from 'underscore';
import { getHours, parseISO, startOfDay } from 'date-fns';

const { selectAll } = activityAdapter.getSelectors();

export const selectActivityFeature =
  createFeatureSelector<ActivityState>('activity');

export const selectActivities = createSelector(
  selectActivityFeature,
  selectAll
);

export const selectActivitiesById = (id: string) =>
  createSelector(selectActivities, (activities) =>
    activities.find((activities) => activities.id === id)
  );

export const selectActivitiesByDay = createSelector(
  selectActivities,
  (activities) =>
    _.chain(activities)
      .sortBy((x) => getHours(parseISO(x.start)))
      .groupBy((x) => startOfDay(parseISO(x.start)).toISOString())
      .value()
);
