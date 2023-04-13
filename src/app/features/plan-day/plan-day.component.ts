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
  Settings,
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
export class PlanDayComponent {
  @ViewChild('modal') public modal: IonModal;

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

  public onAddWorkout(
    workout: WithId<Workout>,
    date: Date,
    settings: Settings
  ) {
    this.events.push(
      this.fb.group<NullableFormGroupOf<Event>>({
        title: this.fb.control(''),
        workout: this.fb.control(workout),
        end: this.fb.control(addMinutes(date, 15).toISOString()),
        start: this.fb.control(addMinutes(date, 0).toISOString()),
        delay: this.fb.control(settings.events.delay),
        repeat: this.fb.control(settings.events.repeat),
        completed: this.fb.control(false),
      })
    );
  }
}
