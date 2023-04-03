import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { initialWorkouts } from '@app/store/workout/workout.reducer';

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
  ],
  templateUrl: './add-activity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddActivityComponent {
  public workouts$ = initialWorkouts;

  public form = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control<string>('', [Validators.required]),
    workout: this.fb.nonNullable.control<Workout | null>(null, [
      Validators.required,
    ]),
    start: this.fb.nonNullable.control<string>('', [Validators.required]),
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
