import { environment } from '@/environments/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration/hydration.reducer';
import { ProfileState, profileReducer } from './profile/profile.reducer';
import { SexState, sexReducer } from './sex/sex.reducer';
import {
  ActivityLevelState,
  activityLevelReducer,
} from './activity-level/activity-level.reducer';

export interface AppState {
  sex: SexState;
  profile: ProfileState;
  activityLevel: ActivityLevelState;
}

export const reducers: ActionReducerMap<AppState> = {
  sex: sexReducer,
  profile: profileReducer,
  activityLevel: activityLevelReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [hydrationMetaReducer]
  : [hydrationMetaReducer];
