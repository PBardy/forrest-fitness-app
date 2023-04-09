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
  public loadAll$ = this.actions$.pipe(
    ofType(EventActions.loadall),
    withLatestFrom(this.store.select(selectEventsTotal)),
    filter(([_, x]) => x < 1),
    exhaustMap(() =>
      this.event
        .getAll()
        .pipe(map((payload) => EventActions.setall({ payload })))
    )
  );

  public addOne$ = this.actions$.pipe(
    ofType(EventActions.addone),
    exhaustMap((x) =>
      this.event.addOne(x.payload).pipe(
        switchMap((x) => this.event.getOne(x.id)),
        map((payload) => EventActions.onaddone({ payload })),
        tap(() => this.toast.present({ message: 'Event Added' })),
        tap(() => this.router.navigate(['app', 'events']))
      )
    )
  );

  public addMany$ = this.actions$.pipe(
    ofType(EventActions.addmany),
    exhaustMap((x) =>
      this.event.addMany(x.payload).pipe(
        map((payload) => EventActions.onaddmany({ payload })),
        tap(() => this.toast.present({ message: 'Events Added' })),
        tap(() => this.router.navigate(['app', 'events']))
      )
    )
  );

  public updateOne$ = this.actions$.pipe(
    ofType(EventActions.updateone),
    exhaustMap((x) =>
      this.event.updateOne(x.payload.id, x.payload).pipe(
        map(() => EventActions.onupdateone({ payload: x.payload })),
        tap(() => this.toast.present({ message: 'Event Updated' })),
        tap(() => this.router.navigate(['app', 'events', x.payload.id]))
      )
    )
  );

  public deleteOne$ = this.actions$.pipe(
    ofType(EventActions.deleteone),
    exhaustMap((x) =>
      this.event.deleteOne(x.payload).pipe(
        map(() => EventActions.ondeleteone({ payload: x.payload })),
        tap(() => this.toast.present({ message: 'Event Deleted' })),
        tap(() => this.router.navigate(['app', 'events']))
      )
    )
  );

  public constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly toast: ToastService,
    private readonly actions$: Actions,
    private readonly event: EventService
  ) {
    createEffect(() => this.addOne$);
    createEffect(() => this.addMany$);
    createEffect(() => this.updateOne$);
    createEffect(() => this.deleteOne$);
    createEffect(() => this.loadAll$);
  }
}
