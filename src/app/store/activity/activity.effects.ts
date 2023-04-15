import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  exhaustMap,
  catchError,
  withLatestFrom,
  filter,
} from 'rxjs/operators';
import { AppState } from '..';
import { ActivityService } from '@services/activity.service';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { EMPTY, of, tap } from 'rxjs';
import { switchMap } from 'rxjs';
import { ActivityActions } from './activity.actions';
import { selectLastRefresh } from './activity.selectors';
import { addDays, isBefore, parseISO } from 'date-fns';

@Injectable()
export class ActivityEfffects {
  public readonly loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.loadall),
      withLatestFrom(this.store.select(selectLastRefresh)),
      map(([_, x]) => isBefore(parseISO(x), addDays(new Date(), -1))),
      filter(Boolean),
      exhaustMap(() =>
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
          tap(async ({ payload }) => {
            await this.toast.present({ message: 'Activity Updated' });
            await this.router.navigate(['app', 'activities', payload.id]);
          })
        )
      )
    )
  );

  public readonly deleteOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.deleteone),
      map((x) => x.payload),
      exhaustMap((payload) =>
        this.activity.deleteOne(payload).pipe(
          map(() => ActivityActions.ondeleteone({ payload })),
          tap(async () => {
            await this.toast.present({ message: 'Activity Delete' });
            await this.router.navigate(['app', 'activities']);
          })
        )
      )
    )
  );

  public constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly toast: ToastService,
    private readonly actions$: Actions,
    private readonly activity: ActivityService
  ) {}
}
