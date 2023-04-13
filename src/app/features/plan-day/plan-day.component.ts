import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal, IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { map, first } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { addMinutes, parseISO, startOfDay } from 'date-fns';
import { Store } from '@ngrx/store';
import { selectWorkouts } from '@app/store/workout/workout.selectors';
import { selectSettings } from '@app/store/settings/settings.selectors';
import { FormGroupOf, Settings, WithId, Workout } from '@types';
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
    slots: this.fb.nonNullable.array<FormGroup<SlotGroup>>([]),
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

  public get slots() {
    return this.form.controls.slots;
  }

  public onCancel() {
    this.router.navigate(['app', 'events']);
  }

  public onSave(settings: Settings) {
    const payload = this.slots.value
      .map((slot) => {
        const value = slot as NonNullable<Slot>;
        const end = value.start;
        const start = value.start;

        return value.workouts.map((workout) => ({
          end,
          start,
          title: workout.label,
          workout,
          delay: settings.events.delay,
          repeat: settings.events.repeat,
          completed: false,
        }));
      })
      .flat();

    this.store.dispatch(EventActions.addmany({ payload }));
  }

  public onAddSlot() {
    this.date$.pipe(first()).subscribe((date) => {
      this.slots.push(
        this.fb.nonNullable.group<SlotGroup>({
          end: this.fb.nonNullable.control<string>(''),
          start: this.fb.nonNullable.control<string>(
            startOfDay(date).toISOString()
          ),
          workouts: this.fb.nonNullable.control<Array<WithId<Workout>>>([]),
        })
      );
    });
  }

  public onChooseWorkout(
    modal: IonModal,
    control: FormGroup<SlotGroup>,
    workout: WithId<Workout>
  ) {
    modal.dismiss();

    const controls = control.controls;
    const workouts = controls.workouts;
    controls.workouts.patchValue([...workouts.value, workout]);
  }
}

type Slot = {
  end: string;
  start: string;
  workouts: Array<WithId<Workout>>;
};

type SlotGroup = {
  end: FormControl<string>;
  start: FormControl<string>;
  workouts: FormControl<Array<WithId<Workout>>>;
};
