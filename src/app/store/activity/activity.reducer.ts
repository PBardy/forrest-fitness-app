import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Activity, WithId } from '@types';
import { ActivityActions } from './activity.actions';

export const selectId = (a: WithId<Activity>): string => {
  return String(a.id);
};

export type ActivityState = EntityState<WithId<Activity>> & {
  lastRefresh: string;
};

export const activityAdapter: EntityAdapter<WithId<Activity>> =
  createEntityAdapter<WithId<Activity>>({
    selectId,
  });

export const initialActivityState = activityAdapter.setAll(
  [],
  activityAdapter.getInitialState({
    lastRefresh: '',
  })
);

export const activityReducer = createReducer(
  initialActivityState,
  on(ActivityActions.onaddone, (state, { payload }) => {
    return activityAdapter.addOne(payload, state);
  }),
  on(ActivityActions.onupdateone, (state, { payload }) => {
    const id = payload.id;
    return activityAdapter.updateOne({ id, changes: payload }, state);
  }),
  on(ActivityActions.ondeleteone, (state, { payload }) => {
    return activityAdapter.removeOne(payload.id, state);
  }),
  on(ActivityActions.setall, (state) => {
    return { ...state, lastRefresh: new Date().toISOString() };
  }),
  on(ActivityActions.setall, (state, { payload }) => {
    return activityAdapter.setAll(payload, state);
  })
);
