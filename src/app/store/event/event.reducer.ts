import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Event, WithId } from '@types';
import { EventActions } from './event.actions';

export const selectId = (a: WithId<Event>): string => {
  return String(a.id);
};

export type EventState = EntityState<WithId<Event>>;

export const eventAdapter: EntityAdapter<WithId<Event>> = createEntityAdapter<
  WithId<Event>
>({
  selectId,
});

export const initialEventState = eventAdapter.setAll(
  [],
  eventAdapter.getInitialState()
);

export const eventReducer = createReducer(
  initialEventState,
  on(EventActions.onaddone, (state, { payload }) => {
    return eventAdapter.addOne(payload, state);
  }),
  on(EventActions.onupdateone, (state, { payload }) => {
    const id = payload.id;
    return eventAdapter.updateOne({ id, changes: payload }, state);
  }),
  on(EventActions.ondeleteone, (state, { payload }) => {
    return eventAdapter.removeOne(payload.id, state);
  }),
  on(EventActions.setall, (state, { payload }) => {
    return eventAdapter.setAll(payload, state);
  })
);
