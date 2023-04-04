import { createReducer } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { EventRepeat, WithId } from '@types';

export const selectId = (a: WithId<EventRepeat>): string => {
  return a.id;
};

export type EventRepeatState = EntityState<WithId<EventRepeat>>;

export const eventRepeatAdapter: EntityAdapter<WithId<EventRepeat>> =
  createEntityAdapter<WithId<EventRepeat>>({
    selectId,
  });

export const initialEventRepeatState = eventRepeatAdapter.setAll(
  [
    { id: '1', label: 'No repeat' },
    { id: '2', label: 'Daily', every: 'day' },
    { id: '3', label: 'Weekly', every: 'week' },
    { id: '4', label: 'Bi-weekly', every: 'two-weeks' },
    { id: '5', label: 'Monthly', every: 'month' },
    { id: '6', label: 'Yearly', every: 'year' },
  ],
  eventRepeatAdapter.getInitialState()
);

export const eventRepeatReducer = createReducer(initialEventRepeatState);
