import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectWorkouts } from '@app/store/workout/workout.selectors';
import { selectEventDelays } from '@app/store/event-delay/event-delay.selectors';
import { selectEventRepeats } from '@app/store/event-repeat/event-repeat.selectors';
import { LetModule } from '@ngrx/component';
import { EventDelay, EventRepeat, Settings, WithId, Workout } from '@types';
import { selectSettings } from '@app/store/settings/settings.selectors';
import { ReplaySubject, takeUntil } from 'rxjs';
import { SettingsActions } from '@app/store/settings/settings.actions';
import { WorkoutActions } from '@app/store/workout/workout.actions';
import { AuthService } from '@services/auth.service';
import { ProfileActions } from '@app/store/profile/profile.actions';
import { AuthActions } from '@app/store/auth/auth.actions';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    LetModule,
  ],
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  public destroy$ = new ReplaySubject<boolean>(1);

  public settings$ = this.store.select(selectSettings);
  public workouts$ = this.store.select(selectWorkouts);
  public eventDelays$ = this.store.select(selectEventDelays);
  public eventRepeats$ = this.store.select(selectEventRepeats);

  public form = this.fb.nonNullable.group({
    events: this.fb.nonNullable.group({
      delay: this.fb.nonNullable.control<WithId<EventDelay> | null>(null),
      repeat: this.fb.nonNullable.control<WithId<EventRepeat> | null>(null),
      workout: this.fb.nonNullable.control<WithId<Workout> | null>(null),
    }),
  });

  public constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly auth: AuthService
  ) {}

  public ngOnInit(): void {
    this.settings$
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => this.form.patchValue(x));

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) =>
        this.store.dispatch(
          SettingsActions.set({ payload: x as NonNullable<Settings> })
        )
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onAddWorkout() {
    this.router.navigate(['app', 'workouts', 'new']);
  }

  public onEditWorkout(payload: WithId<Workout>) {
    this.router.navigate(['app', 'workouts', payload.id, 'edit']);
  }

  public onDeleteWorkout(payload: WithId<Workout>) {
    this.store.dispatch(WorkoutActions.deleteone({ payload }));
  }

  public onSignOut() {
    this.store.dispatch(AuthActions.signout());
  }

  public onDeleteAccount() {
    this.store.dispatch(ProfileActions.delete());
  }
}
