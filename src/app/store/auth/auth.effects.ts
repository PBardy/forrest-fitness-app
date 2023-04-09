import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ProfileActions } from '../profile/profile.actions';
import { exhaustMap, catchError, tap } from 'rxjs';
import { ActivityService } from '@services/activity.service';
import { EventService } from '@services/event.service';
import { AlertService } from '@services/alert.service';

@Injectable()
export class AuthEffects {
  public onDeleteAccount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.delete),
        exhaustMap(() => this.events.deleteAll()),
        exhaustMap(() => this.activities.deleteAll()),
        exhaustMap(() =>
          this.auth
            .deleteAccount()
            .pipe(tap(() => this.router.navigate(['sign-up'])))
        ),
        catchError(() =>
          this.alerts.present({
            message: 'This requires a recent operation.',
          })
        )
      ),
    { dispatch: false }
  );

  public constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly events: EventService,
    private readonly activities: ActivityService,
    private readonly actions$: Actions,
    private readonly alerts: AlertService
  ) {}
}
