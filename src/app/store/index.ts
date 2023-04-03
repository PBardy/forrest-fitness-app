import { environment } from '@/environments/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration/hydration.reducer';
import { ProfileState, profileReducer } from './profile/profile.reducer';

export interface AppState {
  profile: ProfileState;
}

export const reducers: ActionReducerMap<AppState> = {
  profile: profileReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [hydrationMetaReducer]
  : [hydrationMetaReducer];
