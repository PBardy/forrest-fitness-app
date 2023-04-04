import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EventActions } from '../event/event.actions';
import { NotificationsService } from '@services/notifications.service';
import { exhaustMap, filter, map, tap } from 'rxjs';

@Injectable()
export class NotificationEffects {
  public readonly onAddOne$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.onaddone),
        map((x) => x.payload),
        filter((x) => x.delay.by !== null),
        exhaustMap((x) => this.notifications.schedule(x))
      ),
    { dispatch: false }
  );

  public readonly onUpdateOne$ = createEffect(
    () => this.actions$.pipe(ofType(EventActions.onupdateone)),
    { dispatch: false }
  );

  public readonly onDeleteOne$ = createEffect(
    () => this.actions$.pipe(ofType(EventActions.ondeleteone)),
    { dispatch: false }
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly notifications: NotificationsService
  ) {}
}
