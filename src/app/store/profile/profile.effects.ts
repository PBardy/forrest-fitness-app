import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProfileActions } from './profile.actions';
import { ToastService } from '@services/toast.service';
import { ProfileService } from '@services/profile.service';

@Injectable()
export class ProfileEffects {
  public readonly onSet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.set),
        map((action) => action.payload),
        tap((profile) =>
          profile
            ? this.router.navigate(['app'])
            : this.router.navigate(['sign-in'])
        )
      ),
    { dispatch: false }
  );

  public readonly onUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.update),
        map((x) => x.payload),
        exhaustMap((x) =>
          x
            ? this.router.navigate(['app/profile'])
            : this.router.navigate(['sign-in'])
        ),
        switchMap((_) => this.toast.present({ message: 'Profile updated' }))
      ),
    { dispatch: false }
  );

  public constructor(
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly toast: ToastService,
    private readonly profile: ProfileService
  ) {}
}
