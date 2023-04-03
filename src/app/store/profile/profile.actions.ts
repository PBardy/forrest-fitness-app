import { createActionGroup, props } from '@ngrx/store';
import { Profile } from '@types';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    Set: props<{ payload: Profile }>(),
    Update: props<{ payload: Profile }>(),
  },
});
