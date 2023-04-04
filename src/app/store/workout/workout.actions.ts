import { createActionGroup, props } from '@ngrx/store';
import { Profile, WithId, Workout } from '@types';

export const WorkoutActions = createActionGroup({
  source: 'Profile',
  events: {
    AddOne: props<{ payload: Workout }>(),
    UpdateOne: props<{ payload: WithId<Workout> }>(),
    DeleteOne: props<{ payload: WithId<Workout> }>(),
    OnAddOne: props<{ payload: WithId<Workout> }>(),
    OnUpdateOne: props<{ payload: WithId<Workout> }>(),
  },
});
