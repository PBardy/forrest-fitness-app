import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { ReplaySubject, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { selectActivitiesById } from '@app/store/activity/activity.selectors';
import { selectWorkouts } from '@app/store/workout/workout.selectors';

@Component({
  selector: 'app-edit-activity',
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
  templateUrl: './edit-activity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditActivityComponent implements OnInit, OnDestroy {
  public destroy$ = new ReplaySubject<boolean>(1);
  public workouts$ = this.store.select(selectWorkouts);

  public activity$ = this.route.paramMap.pipe(
    map((x) => x.get('id') as string),
    switchMap((x) => this.store.select(selectActivitiesById(x)))
  );

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
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.activity$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((x) => this.form.patchValue(x))
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onCancel() {
    this.router.navigate(['app', 'activities', 'all']);
  }

  public onSave(id: string) {
    const value = this.form.getRawValue() as NonNullable<Activity>;
    const payload = { id, ...value };

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(ActivityActions.updateone({ payload }));
  }
}
