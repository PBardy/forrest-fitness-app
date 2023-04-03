import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EventRepeatState, eventRepeatAdapter } from './event-repeat.reducer';

const { selectAll } = eventRepeatAdapter.getSelectors();

export const selectEventRepeatFeature =
  createFeatureSelector<EventRepeatState>('eventRepeat');

export const selectEventRepeats = createSelector(
  selectEventRepeatFeature,
  selectAll
);
