import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom, tap } from 'rxjs';
import { WorkoutActions } from './workout.actions';
import { selectWorkoutsTotal } from './workout.selectors';
import { Router } from '@angular/router';

@Injectable()
export class WorkoutEffects {
  public readonly addOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutActions.addone),
      map((x) => x.payload),
      withLatestFrom(this.store.select(selectWorkoutsTotal)),
      tap((_) => this.router.navigate(['app', 'settings'])),
      map(([workout, total]) => ({ id: String(total + 1), ...workout })),
      switchMap((payload) => [WorkoutActions.onaddone({ payload })])
    )
  );

  public constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly router: Router
  ) {}
}
