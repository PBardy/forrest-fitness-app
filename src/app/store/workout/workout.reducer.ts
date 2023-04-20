import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Workout, WithId } from '@types';
import { WorkoutActions } from './workout.actions';

export const selectId = (a: WithId<Workout>): string => {
  return String(a.id);
};

export const sortComparer = (a: WithId<Workout>, b: WithId<Workout>) => {
  return a.label.localeCompare(b.label);
};

export type WorkoutState = EntityState<WithId<Workout>>;

export const workoutAdapter: EntityAdapter<WithId<Workout>> =
  createEntityAdapter<WithId<Workout>>({
    selectId,
    sortComparer,
  });

export const initialWorkouts: WithId<Workout>[] = [
  {
    id: '1',
    label: 'Aerobics',
    icon: 'a',
    energy: 5.3,
    intensity: 1,
    duration: 15,
  },
  {
    id: '2',
    label: 'Calisthenics',
    icon: 'c',
    energy: 4.3,
    intensity: 1,
    duration: 15,
  },
  {
    id: '3',
    label: 'Circuit Training',
    icon: 't',
    energy: 4.3,
    intensity: 1,
    duration: 15,
  },
  {
    id: '4',
    label: 'Rowing',
    icon: 'r',
    energy: 4.8,
    intensity: 1,
    duration: 15,
  },
  {
    id: '5',
    label: 'Walking',
    icon: 'walking',
    energy: 3.5,
    intensity: 1,
    duration: 15,
  },
  {
    id: '6',
    label: 'Weight Lifting',
    icon: 'w',
    energy: 5,
    intensity: 1,
    duration: 15,
  },
  {
    id: '7',
    label: 'Yoga',
    icon: 'y',
    energy: 2.5,
    intensity: 1,
    duration: 15,
  },
];

export const initialWorkoutState = workoutAdapter.setAll(
  initialWorkouts,
  workoutAdapter.getInitialState()
);

export const workoutReducer = createReducer(
  initialWorkoutState,
  on(WorkoutActions.onaddone, (state, { payload }) => {
    return workoutAdapter.addOne(payload, state);
  }),
  on(WorkoutActions.onupdateone, (state, { payload }) => {
    const id = payload.id;
    return workoutAdapter.updateOne({ id, changes: payload }, state);
  }),
  on(WorkoutActions.deleteone, (state, { payload }) => {
    return workoutAdapter.removeOne(payload.id, state);
  })
);
