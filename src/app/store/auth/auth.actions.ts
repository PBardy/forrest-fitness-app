import { createActionGroup, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    SignOut: props<any>(),
  },
});
