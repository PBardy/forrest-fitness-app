import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EventState, eventAdapter } from './event.reducer';
import {
  addDays,
  getHours,
  isWithinInterval,
  parseISO,
  startOfDay,
} from 'date-fns';
import * as _ from 'underscore';

const { selectAll, selectTotal } = eventAdapter.getSelectors();

export const selectEventFeature = createFeatureSelector<EventState>('event');

export const selectEvents = createSelector(selectEventFeature, selectAll);

export const selectEventsTotal = createSelector(
  selectEventFeature,
  selectTotal
);

export const selectEventById = (id: string) =>
  createSelector(selectEvents, (events) =>
    events.find((event) => event.id === id)
  );

export const selectEventsByDate = (date: Date) =>
  createSelector(selectEvents, (events) =>
    _.chain(events)
      .sortBy((x) => getHours(parseISO(x.start)))
      .filter((x) =>
        isWithinInterval(parseISO(x.start), {
          end: addDays(startOfDay(date), 1),
          start: addDays(startOfDay(date), 0),
        })
      )
      .value()
  );

export const selectEventfulDays = createSelector(selectEvents, (events) =>
  _.chain(events)
    .map((x) => addDays(startOfDay(parseISO(x.start)), 1))
    .unique()
    .value()
);
