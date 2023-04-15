import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Activity, Workout } from '@types';
import { ActivityActions } from '@app/store/activity/activity.actions';
import { selectWorkouts } from '@app/store/workout/workout.selectors';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FontAwesomeModule,
    LetModule,
    FormsModule,
    ReactiveFormsModule,
    LetModule,
  ],
  templateUrl: './add-activity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddActivityComponent implements OnInit, OnDestroy {
  public destroy$ = new ReplaySubject<boolean>(1);

  public readonly workouts$ = this.store.select(selectWorkouts);

  public form = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control<string>('', [Validators.required]),
    workout: this.fb.nonNullable.control<Workout | null>(null, [
      Validators.required,
    ]),
    start: this.fb.nonNullable.control<string>(new Date().toISOString(), [
      Validators.required,
    ]),
    intensity: this.fb.nonNullable.control<number | undefined>(undefined),
    duration: this.fb.nonNullable.control<number | undefined>(undefined),
    distance: this.fb.nonNullable.control<number | undefined>(undefined),
    energy: this.fb.nonNullable.control<number | undefined>(undefined),
    steps: this.fb.nonNullable.control<number | undefined>(undefined),
    notes: this.fb.nonNullable.control<string>(''),
  });

  public constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  public get title() {
    return this.form.controls.title;
  }

  public get workout() {
    return this.form.controls.workout;
  }

  public ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (x) =>
          x.workout &&
          this.title.value == '' &&
          this.title.patchValue(x.workout.label)
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onCancel() {
    this.router.navigate(['app', 'activities', 'all']);
  }

  public onSave() {
    const payload = this.form.getRawValue() as NonNullable<Activity>;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(ActivityActions.addone({ payload }));
  }
}
