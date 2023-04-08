import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AppState } from '..';
import { ActivityService } from '@services/activity.service';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { EMPTY, of, tap } from 'rxjs';
import { switchMap } from 'rxjs';
import { ActivityActions } from './activity.actions';

@Injectable()
export class ActivityEfffects {
  public readonly loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.loadall),
      exhaustMap(() =>
        this.activity
          .getAll()
          .pipe(map((payload) => ActivityActions.setall({ payload })))
      )
    )
  );

  public readonly refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.refresh),
      map((x) => x.payload),
      exhaustMap((refresher) =>
        this.activity
          .getAll()
          .pipe(map((payload) => ActivityActions.setall({ payload })))
      )
    )
  );

  public readonly addOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.addone),
      map((x) => x.payload),
      exhaustMap((payload) =>
        this.activity.addOne(payload).pipe(
          switchMap((x) => this.activity.getOne(x.id)),
          map((payload) => ActivityActions.onaddone({ payload })),
          tap(({ payload }) =>
            this.router.navigate(['app', 'activities', payload.id])
          )
        )
      )
    )
  );

  public readonly updateOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.updateone),
      map((x) => x.payload),
      exhaustMap((payload) =>
        this.activity.updateOne(payload.id, payload).pipe(
          map(() => ActivityActions.onupdateone({ payload })),
          tap(() => this.router.navigate(['app', 'activities', payload.id]))
        )
      )
    )
  );

  public readonly onAddOne$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.onaddone),
        exhaustMap(() => this.toast.present({ message: 'Activity Added' }))
      ),
    { dispatch: false }
  );

  public readonly onUpdateOne$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.onupdateone),
        exhaustMap(() => this.toast.present({ message: 'Activity Updated' }))
      ),
    { dispatch: false }
  );

  public readonly onDeleteOne$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.ondeleteone),
        exhaustMap(() => this.toast.present({ message: 'Activity Delete' }))
      ),
    { dispatch: false }
  );

  public readonly deleteOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.deleteone),
      map((x) => x.payload),
      exhaustMap((payload) =>
        this.activity.deleteOne(payload).pipe(
          tap((_) => this.router.navigate(['app', 'activities'])),
          map(() => ActivityActions.ondeleteone({ payload }))
        )
      )
    )
  );

  public constructor(
    private readonly router: Router,
    private readonly toast: ToastService,
    private readonly actions$: Actions,
    private readonly activity: ActivityService
  ) {}
}
