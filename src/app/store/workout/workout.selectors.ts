import { createSelector, createFeatureSelector } from '@ngrx/store';
import { WorkoutState, workoutAdapter } from './workout.reducer';

const { selectAll } = workoutAdapter.getSelectors();

export const selectWorkoutFeature =
  createFeatureSelector<WorkoutState>('workout');

export const selectWorkouts = createSelector(selectWorkoutFeature, selectAll);
