import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { WorkoutActions } from '@app/store/workout/workout.actions';
import { Workout } from '@types';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-workout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorkoutComponent {
  public form = this.fb.nonNullable.group({
    icon: this.fb.nonNullable.control<string>('tree', [Validators.required]),
    label: this.fb.nonNullable.control<string>('', [Validators.required]),
    energy: this.fb.nonNullable.control<number | null>(null, [
      Validators.required,
    ]),
    intensity: this.fb.nonNullable.control<number | null>(null, [
      Validators.required,
    ]),
  });

  public constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  public onCancel() {
    this.router.navigate(['app', 'settings']);
  }

  public onSave() {
    const payload = this.form.getRawValue() as NonNullable<Workout>;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(WorkoutActions.addone({ payload }));
  }
}
