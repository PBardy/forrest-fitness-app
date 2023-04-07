import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal, IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  BehaviorSubject,
  NEVER,
  ReplaySubject,
  dematerialize,
  filter,
  interval,
  map,
  materialize,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Activity, WithId, Workout } from '@types';
import { LetModule } from '@ngrx/component';
import { StopwatchPipe } from '@pipes/stopwatch.pipe';
import { Store } from '@ngrx/store';
import { ActivityActions } from '@app/store/activity/activity.actions';
import {
  selectWorkoutById,
  selectWorkouts,
} from '@app/store/workout/workout.selectors';

@Component({
  selector: 'app-record-activity',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    LetModule,
    FontAwesomeModule,
    StopwatchPipe,
  ],
  templateUrl: './record-activity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordActivityComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('modal') public modal: IonModal;

  public readonly form = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control<string>('', [Validators.required]),
    workout: this.fb.nonNullable.control<WithId<Workout> | null>(null, [
      Validators.required,
    ]),
    start: this.fb.nonNullable.control<string>('', [Validators.required]),
    distance: this.fb.nonNullable.control<number | undefined>(undefined),
    duration: this.fb.nonNullable.control<number | undefined>(undefined),
    intensity: this.fb.nonNullable.control<number | undefined>(undefined),
    energy: this.fb.nonNullable.control<number | undefined>(undefined),
    notes: this.fb.nonNullable.control<string>(''),
  });

  // Auto-fill
  public id$ = this.route.paramMap.pipe(map((x) => x.get('id') as string));
  public destroy$ = new ReplaySubject<boolean>(1);
  public workouts$ = this.store.select(selectWorkouts);

  // State

  public source$ = interval(1000);
  public started$ = new BehaviorSubject<boolean>(false);
  public paused$ = new BehaviorSubject<boolean>(false);
  public stopped$ = new BehaviorSubject<boolean>(true);
  public count$ = new BehaviorSubject<number>(0);
  public energy$ = new BehaviorSubject<number>(0);
  public distance$ = new BehaviorSubject<number>(0);
  public intensity$ = new BehaviorSubject<number>(0);

  // Stopwatch

  public stopwatch$ = this.paused$.pipe(
    switchMap((p) => (p ? NEVER : this.source$.pipe(materialize()))),
    dematerialize(),
    tap((_) => {
      if (this.paused$.getValue()) return;
      if (this.stopped$.getValue()) return;

      // Update count
      this.count$.next(this.count$.getValue() + 1);

      // Update workout values
      const workout = this.workout.value;
      if (workout) {
        this.energy$.next(this.energy$.getValue() + workout.energy);
        this.intensity$.next(this.intensity$.getValue() + workout.intensity);
      }
    }),
    switchMap((_) => this.count$)
  );

  public constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}

  public get start() {
    return this.form.controls.start;
  }

  public get title() {
    return this.form.controls.title;
  }

  public get workout() {
    return this.form.controls.workout;
  }

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.id$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        switchMap((x) => this.store.select(selectWorkoutById(x))),
        filter(Boolean),
        tap((x) => this.onChooseWorkout(x))
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onStart() {
    this.started$.next(true);
    this.stopped$.next(false);
    this.start.patchValue(new Date().toISOString());
  }

  public onPause() {
    this.paused$.next(true);
    this.stopped$.next(false);
  }

  public onResume() {
    this.paused$.next(false);
    this.stopped$.next(false);
  }

  public onCancel() {
    this.router.navigate(['app', 'activities']);
  }

  public onFinish() {
    this.paused$.next(true);
    this.stopped$.next(true);

    this.form.patchValue({
      energy: this.energy$.getValue(),
      duration: this.count$.getValue(),
      intensity: this.intensity$.getValue(),
    });
  }

  public onSave() {
    const payload = this.form.getRawValue() as NonNullable<Activity>;

    this.store.dispatch(ActivityActions.addone({ payload }));
  }

  public async onChooseWorkout(workout: WithId<Workout>) {
    this.title.patchValue(workout.label);
    this.workout.patchValue(workout);

    await this.modal.dismiss();
  }
}
