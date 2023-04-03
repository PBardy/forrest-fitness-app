import { environment } from '@/environments/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration/hydration.reducer';
import { ProfileState, profileReducer } from './profile/profile.reducer';
import { SexState, sexReducer } from './sex/sex.reducer';
import {
  ActivityLevelState,
  activityLevelReducer,
} from './activity-level/activity-level.reducer';
import { WorkoutState, workoutReducer } from './workout/workout.reducer';
import { ActivityState, activityReducer } from './activity/activity.reducer';

export interface AppState {
  sex: SexState;
  workout: WorkoutState;
  profile: ProfileState;
  activity: ActivityState;
  activityLevel: ActivityLevelState;
}

export const reducers: ActionReducerMap<AppState> = {
  sex: sexReducer,
  workout: workoutReducer,
  profile: profileReducer,
  activity: activityReducer,
  activityLevel: activityLevelReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [hydrationMetaReducer]
  : [hydrationMetaReducer];
