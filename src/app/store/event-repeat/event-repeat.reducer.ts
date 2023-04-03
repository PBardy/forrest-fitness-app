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
    { id: '1', label: 'No repeat', frequency: null },
    { id: '2', label: 'Daily', frequency: 1 },
    { id: '3', label: 'Weekly', frequency: 7 },
  ],
  eventRepeatAdapter.getInitialState()
);

export const eventRepeatReducer = createReducer(initialEventRepeatState);
