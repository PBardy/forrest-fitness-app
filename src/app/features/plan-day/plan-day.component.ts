import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal, IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { combineLatest, ReplaySubject, map } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { addMinutes, parseISO, startOfDay } from 'date-fns';
import { Store } from '@ngrx/store';
import { selectWorkouts } from '@app/store/workout/workout.selectors';
import {
  Event,
  EventDelay,
  EventRepeat,
  FormGroupOf,
  NullableFormGroupOf,
  WithId,
  Workout,
} from '@types';
import { selectSettings } from '@app/store/settings/settings.selectors';
import { EventActions } from '@app/store/event/event.actions';

@Component({
  selector: 'app-plan-day',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LetModule,
  ],
  templateUrl: './plan-day.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDayComponent implements OnInit, OnDestroy {
  @ViewChild('modal') public modal: IonModal;

  public selected: number | null = null;
  public destroy$ = new ReplaySubject<boolean>(1);

  public workouts$ = this.store.select(selectWorkouts);
  public settings$ = this.store.select(selectSettings);

  public date$ = this.route.paramMap.pipe(
    map((x) => x.get('date') as string),
    map((x) => (x ? parseISO(x) : new Date()))
  );

  public form = this.fb.nonNullable.group({
    date: this.fb.nonNullable.control<string>(new Date().toISOString(), [
      Validators.required,
    ]),
    events: this.fb.nonNullable.array<FormGroup>([]),
  });

  public constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  public get date() {
    return this.form.controls.date;
  }

  public get events(): FormArray<FormGroup<NullableFormGroupOf<Event>>> {
    return this.form.controls.events;
  }

  public ngOnInit(): void {
    combineLatest({ date: this.date$, settings: this.settings$ }).subscribe(
      ({ date, settings }) => {
        this.form = this.fb.nonNullable.group({
          date: this.fb.nonNullable.control<string>(date.toISOString()),
          events: this.fb.array<FormGroup<NullableFormGroupOf<Event>>>(
            new Array(96).fill(startOfDay(date)).map((x, i) =>
              this.fb.group<NullableFormGroupOf<Event>>({
                title: this.fb.control(''),
                workout: this.fb.control(null),
                end: this.fb.control(addMinutes(x, i * 15 + 15).toISOString()),
                start: this.fb.control(addMinutes(x, i * 15).toISOString()),
                delay: this.fb.control(settings.events.delay),
                repeat: this.fb.control(settings.events.repeat),
                completed: this.fb.control(false),
              })
            )
          ),
        });
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onCancel() {
    this.router.navigate(['app', 'events']);
  }

  public onSave() {
    if (this.events.invalid) {
      this.events.markAllAsTouched();
      return;
    }

    const events = this.events.getRawValue() as Event[];
    const payload = events.filter((e) => e.workout !== null);

    this.store.dispatch(EventActions.addmany({ payload }));
  }

  public onClick(index: number) {
    this.selected = index;
    this.modal.present();
  }

  public onChooseWorkout(workout: WithId<Workout>) {
    this.modal.dismiss();

    if (this.selected !== null) {
      const group = this.events.at(this.selected);
      const start = parseISO(group.value.start as string);
      const end = addMinutes(start, workout.duration).toISOString();

      group.patchValue({ workout, end });
    }
  }
}
