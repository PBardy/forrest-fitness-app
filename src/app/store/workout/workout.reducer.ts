import { createReducer } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Workout, WithId } from '@types';

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
    energy: 1,
    intensity: 1,
  },
  {
    id: '2',
    label: 'Calisthenics',
    icon: 'c',
    energy: 1,
    intensity: 1,
  },
  {
    id: '3',
    label: 'Circuit Training',
    icon: 't',
    energy: 1,
    intensity: 1,
  },
  {
    id: '4',
    label: 'Rowing',
    icon: 'r',
    energy: 1,
    intensity: 1,
  },
  {
    id: '5',
    label: 'Walking',
    icon: 'walking',
    energy: 1,
    intensity: 1,
  },
  {
    id: '6',
    label: 'Weight Lifting',
    icon: 'w',
    energy: 1,
    intensity: 1,
  },
  {
    id: '7',
    label: 'Yoga',
    icon: 'y',
    energy: 1,
    intensity: 1,
  },
];

export const initialWorkoutState = workoutAdapter.setAll(
  initialWorkouts,
  workoutAdapter.getInitialState()
);

export const workoutReducer = createReducer(initialWorkoutState);
