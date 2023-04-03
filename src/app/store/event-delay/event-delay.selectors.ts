import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EventDelayState, eventDelayAdapter } from './event-delay.reducer';

const { selectAll } = eventDelayAdapter.getSelectors();

export const selectEventDelayFeature =
  createFeatureSelector<EventDelayState>('eventDelay');

export const selectEventDelays = createSelector(
  selectEventDelayFeature,
  selectAll
);
