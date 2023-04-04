import { createActionGroup, props } from '@ngrx/store';
import { Settings } from '@types';

export const SettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    Set: props<{ payload: Settings }>(),
    Update: props<{ payload: Settings }>(),
  },
});
