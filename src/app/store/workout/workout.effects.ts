import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { WorkoutActions } from './workout.actions';
import { selectWorkoutsTotal } from './workout.selectors';

@Injectable()
export class WorkoutEffects {
  public readonly addOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutActions.addone),
      map((x) => x.payload),
      withLatestFrom(this.store.select(selectWorkoutsTotal)),
      map(([workout, total]) => ({ id: String(total), ...workout })),
      switchMap((payload) => [WorkoutActions.onaddone({ payload })])
    )
  );

  public constructor(
    private readonly store: Store,
    private readonly actions$: Actions
  ) {}
}
