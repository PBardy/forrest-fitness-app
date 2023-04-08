import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, withLatestFrom, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { tap } from 'rxjs';
import { switchMap } from 'rxjs';
import { EventActions } from './event.actions';
import { EventService } from '@services/event.service';
import { Store } from '@ngrx/store';
import { selectEventsTotal } from './event.selectors';

@Injectable()
export class EventEfffects {
  public readonly loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.loadall),
      withLatestFrom(this.store.select(selectEventsTotal)),
      filter(([_, x]) => x < 1),
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
            this.router.navigate(['app', 'events', payload.id])
          )
        )
      )
    )
  );

  public readonly addMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.addmany),
      map((x) => x.payload),
      exhaustMap((payload) =>
        this.event.addMany(payload).pipe(
          map((payload) => EventActions.onaddmany({ payload })),
          tap(() => this.router.navigate(['app', 'events'])),
          tap(() => this.toast.present({ message: 'Events Added' }))
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
          tap(() => this.router.navigate(['app', 'events', payload.id]))
        )
      )
    )
  );

  public readonly onAddOne$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.onaddone),
        exhaustMap(() => this.toast.present({ message: 'Event Added' }))
      ),
    { dispatch: false }
  );

  public readonly onUpdateOne$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.onupdateone),
        exhaustMap(() => this.toast.present({ message: 'Event Updated' }))
      ),
    { dispatch: false }
  );

  public readonly onDeleteOne$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.ondeleteone),
        exhaustMap(() => this.toast.present({ message: 'Event Deleted' }))
      ),
    { dispatch: false }
  );

  public readonly deleteOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.deleteone),
      map((x) => x.payload),
      exhaustMap((payload) =>
        this.event.deleteOne(payload).pipe(
          tap((_) => this.router.navigate(['app', 'events'])),
          map(() => EventActions.ondeleteone({ payload }))
        )
      )
    )
  );

  public constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly toast: ToastService,
    private readonly actions$: Actions,
    private readonly event: EventService
  ) {}
}
