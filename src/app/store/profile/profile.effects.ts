import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProfileActions } from './profile.actions';

@Injectable()
export class ProfileEffects {
  public readonly onSet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.set),
        map((x) => x.payload),
        exhaustMap((x) =>
          x ? this.router.navigate(['app']) : this.router.navigate(['sign-in'])
        )
      ),
    { dispatch: false }
  );

  public constructor(
    private readonly router: Router,
    private readonly actions$: Actions
  ) {}
}
