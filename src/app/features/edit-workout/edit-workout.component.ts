import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { WithId, Workout } from '@types';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReplaySubject, filter, map, switchMap, takeUntil } from 'rxjs';
import { selectWorkoutById } from '@app/store/workout/workout.selectors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { WorkoutActions } from '@app/store/workout/workout.actions';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'app-edit-workout',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    LetModule,
  ],
  templateUrl: './edit-workout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditWorkoutComponent implements OnInit, OnDestroy {
  // Services
  public fb = inject(FormBuilder);
  public router = inject(Router);
  public store = inject(Store);
  public route = inject(ActivatedRoute);

  public destroy$ = new ReplaySubject<boolean>(1);

  public id$ = this.route.paramMap.pipe(map((x) => x.get('id') as string));

  public workout$ = this.id$.pipe(
    switchMap((id) => this.store.select(selectWorkoutById(id)))
  );

  public form = this.fb.nonNullable.group({
    icon: this.fb.nonNullable.control<IconProp>('tree', [Validators.required]),
    label: this.fb.nonNullable.control<string>('', [Validators.required]),
    energy: this.fb.nonNullable.control<number | null>(null, [
      Validators.required,
    ]),
    intensity: this.fb.nonNullable.control<number | null>(null, [
      Validators.required,
    ]),
    duration: this.fb.nonNullable.control<number | null>(null, [
      Validators.required,
    ]),
  });

  public ngOnInit(): void {
    this.workout$
      .pipe(takeUntil(this.destroy$), filter(Boolean))
      .subscribe((x) => this.form.patchValue(x));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onCancel() {
    this.router.navigate(['app', 'settings']);
  }

  public onSave(id: string) {
    const value = this.form.getRawValue() as NonNullable<Workout>;
    const payload = { id, ...value };
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(WorkoutActions.updateone({ payload }));
  }
}
