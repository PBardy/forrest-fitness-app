import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { tap } from 'rxjs';
import { switchMap } from 'rxjs';
import { EventActions } from './event.actions';
import { EventService } from '@services/event.service';

@Injectable()
export class EventEfffects {
  public readonly loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.loadall),
      exhaustMap(() =>
        this.event
          .getAll()
          .pipe(map((payload) => EventActions.setall({ payload })))
      )
    )
  );

  public readonly addOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.addone),
      map((x) => x.payload),
      exhaustMap((payload) =>
        this.event.addOne(payload).pipe(
          switchMap((x) => this.event.getOne(x.id)),
          map((payload) => EventActions.onaddone({ payload })),
          tap(({ payload }) =>
            this.router.navigate(['app', 'activities', payload.id])
          )
        )
      )
    )
  );

  public readonly updateOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.updateone),
      map((x) => x.payload),
      exhaustMap((payload) =>
        this.event.updateOne(payload.id, payload).pipe(
          map(() => EventActions.onupdateone({ payload })),
          tap(() => this.router.navigate(['app', 'activities', payload.id]))
        )
      )
    )
  );

  public readonly onAddOne$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.onaddone),
        exhaustMap(() => this.toast.present({ message: 'Activity Added' }))
      ),
    { dispatch: false }
  );

  public readonly onUpdateOne$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.onupdateone),
        exhaustMap(() => this.toast.present({ message: 'Activity Updated' }))
      ),
    { dispatch: false }
  );

  public readonly onDeleteOne$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.ondeleteone),
        exhaustMap(() => this.toast.present({ message: 'Activity Delete' }))
      ),
    { dispatch: false }
  );

  public readonly deleteOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.deleteone),
      map((x) => x.payload),
      exhaustMap((payload) =>
        this.event.deleteOne(payload).pipe(
          tap((_) => this.router.navigate(['app', 'activities'])),
          map(() => EventActions.ondeleteone({ payload }))
        )
      )
    )
  );

  public constructor(
    private readonly router: Router,
    private readonly toast: ToastService,
    private readonly actions$: Actions,
    private readonly event: EventService
  ) {}
}
