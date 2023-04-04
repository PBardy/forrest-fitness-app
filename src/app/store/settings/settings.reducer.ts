import { createReducer, on } from '@ngrx/store';
import { Settings } from '@types';
import { SettingsActions } from './settings.actions';

export type SettingsState = {
  settings: Settings;
};

export const initialSettingsState: SettingsState = {
  settings: {
    events: {
      delay: { id: '1', label: 'No reminder', by: null },
      repeat: { id: '1', label: 'No repeat' },
      workout: {
        id: '1',
        label: 'Aerobics',
        icon: 'a',
        energy: 1,
        intensity: 1,
      },
    },
  },
};

export const settingsReducer = createReducer(
  initialSettingsState,
  on(SettingsActions.set, (state, { payload }) => {
    return { ...state, profile: payload };
  }),
  on(SettingsActions.update, (state, { payload }) => {
    return { ...state, profile: payload };
  })
);
