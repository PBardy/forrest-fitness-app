import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ProfileActions } from '../profile/profile.actions';
import { exhaustMap, tap, catchError } from 'rxjs';
import { ActivityService } from '@services/activity.service';
import { EventService } from '@services/event.service';
import { AlertService } from '@services/alert.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  public signOut$ = this.actions$.pipe(
    ofType(AuthActions.signout),
    exhaustMap(() => this.auth.signOut()),
    tap(() => this.router.navigate(['sign-in']))
  );

  public deleteAccount$ = this.actions$.pipe(
    ofType(ProfileActions.delete),
    exhaustMap(() => this.auth.deleteAccount()),
    exhaustMap(() => this.events.deleteAll()),
    exhaustMap(() => this.activities.deleteAll()),
    tap(() => this.router.navigate(['sign-in'])),
    catchError(() => this.alerts.onDeleteAccountError())
  );

  public constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly events: EventService,
    private readonly activities: ActivityService,
    private readonly actions$: Actions,
    private readonly alerts: AlertService
  ) {
    createEffect(() => this.signOut$, {
      dispatch: false,
    });

    createEffect(() => this.deleteAccount$, {
      dispatch: false,
    });
  }
}
