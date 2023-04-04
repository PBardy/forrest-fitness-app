import { createReducer } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { EventDelay, WithId } from '@types';

export const selectId = (a: WithId<EventDelay>): string => {
  return a.id;
};

export type EventDelayState = EntityState<WithId<EventDelay>>;

export const eventDelayAdapter: EntityAdapter<WithId<EventDelay>> =
  createEntityAdapter<WithId<EventDelay>>({
    selectId,
  });

export const initialEventDelayState = eventDelayAdapter.setAll(
  [
    { id: '1', label: 'No reminder', by: null },
    { id: '2', label: 'At time of event', by: 0 },
    { id: '3', label: '1 minute before', by: 1 },
    { id: '4', label: '5 minutes before', by: 5 },
    { id: '5', label: '10 minutes before', by: 10 },
    { id: '6', label: '30 minutes before', by: 30 },
  ],
  eventDelayAdapter.getInitialState()
);

export const eventDelayReducer = createReducer(initialEventDelayState);
