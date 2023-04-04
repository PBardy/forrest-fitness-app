import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ActivityState, activityAdapter } from './activity.reducer';
import * as _ from 'underscore';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  getHours,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

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

export const selectActivitiesByDate = (from: Date) =>
  createSelector(selectActivities, (activities) =>
    _.chain(activities)
      .filter((x) =>
        isWithinInterval(parseISO(x.start), {
          end: endOfDay(from),
          start: startOfDay(from),
        })
      )
      .value()
  );

export const selectActivitiesByWeek = (from: Date) =>
  createSelector(selectActivities, (activities) =>
    _.chain(activities)
      .filter((x) =>
        isWithinInterval(parseISO(x.start), {
          end: endOfWeek(from),
          start: startOfWeek(from),
        })
      )
      .value()
  );

export const selectActivitiesByMonth = (from: Date) =>
  createSelector(selectActivities, (activities) =>
    _.chain(activities)
      .filter((x) =>
        isWithinInterval(parseISO(x.start), {
          end: endOfMonth(from),
          start: startOfMonth(from),
        })
      )
      .value()
  );

export const selectSummaryByDate = (from: Date) =>
  createSelector(selectActivities, (activities) =>
    _.chain(activities)
      .filter((x) =>
        isWithinInterval(parseISO(x.start), {
          end: endOfDay(from),
          start: startOfDay(from),
        })
      )
      .reduce(
        (a, b) => ({
          energy: a.energy + Number(b.energy),
          distance: a.distance + Number(b.distance),
          intensity: a.intensity + Number(b.intensity),
          percentage:
            Math.min(a.percentage + Number(b.intensity) / 22, 1) * 100,
        }),
        {
          energy: 0,
          distance: 0,
          intensity: 0,
          percentage: 0,
        }
      )
      .value()
  );

export const selectSummaryByWeek = (from: Date) =>
  createSelector(selectActivities, (activities) =>
    _.chain(activities)
      .filter((x) =>
        isWithinInterval(parseISO(x.start), {
          end: endOfWeek(from),
          start: startOfWeek(from),
        })
      )
      .reduce(
        (a, b) => ({
          energy: a.energy + Number(b.energy),
          distance: a.distance + Number(b.distance),
          intensity: a.intensity + Number(b.intensity),
          percentage:
            Math.min(a.percentage + Number(b.intensity) / 150, 1) * 100,
        }),
        {
          energy: 0,
          distance: 0,
          intensity: 0,
          percentage: 0,
        }
      )
      .value()
  );

export const selectSummaryByMonth = (from: Date) =>
  createSelector(selectActivities, (activities) =>
    _.chain(activities)
      .filter((x) =>
        isWithinInterval(parseISO(x.start), {
          end: endOfMonth(from),
          start: startOfMonth(from),
        })
      )
      .reduce(
        (a, b) => ({
          energy: a.energy + Number(b.energy),
          distance: a.distance + Number(b.distance),
          intensity: a.intensity + Number(b.intensity),
          percentage:
            Math.min(a.percentage + Number(b.intensity) / 650, 1) * 100,
        }),
        {
          energy: 0,
          distance: 0,
          intensity: 0,
          percentage: 0,
        }
      )
      .value()
  );
