import { createReducer } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ActivityLevel, WithId } from '@types';

export const selectId = (a: WithId<ActivityLevel>): string => {
  return String(a.id);
};

export type ActivityLevelState = EntityState<WithId<ActivityLevel>>;

export const activityLevelAdapter: EntityAdapter<WithId<ActivityLevel>> =
  createEntityAdapter<WithId<ActivityLevel>>({
    selectId,
  });

export const initialActivityLevelState = activityLevelAdapter.setAll(
  [
    {
      id: '1',
      label: 'Inactive',
      description: 'Less than 500 steps per day',
      icon: '0',
    },
    {
      id: '2',
      label: 'Moderate',
      description: '5000 to 7500 steps per day',
      icon: '1',
    },
    {
      id: '3',
      label: 'Active',
      description: '7500 to 10000 steps per day',
      icon: '2',
    },
    {
      id: '4',
      label: 'Very Active',
      description: 'More than 10000 steps per day',
      icon: '3',
    },
  ],
  activityLevelAdapter.getInitialState()
);

export const activityLevelReducer = createReducer(initialActivityLevelState);
