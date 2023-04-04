import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectEventDelays } from '@app/store/event-delay/event-delay.selectors';
import { selectEventRepeats } from '@app/store/event-repeat/event-repeat.selectors';
import { selectWorkouts } from '@app/store/workout/workout.selectors';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { Event, EventDelay, EventRepeat, WithId, Workout } from '@types';
import { EventActions } from '@app/store/event/event.actions';
import { ReplaySubject, takeUntil } from 'rxjs';
import { selectSettings } from '@app/store/settings/settings.selectors';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    LetModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEventComponent implements OnInit, OnDestroy {
  public destroy$ = new ReplaySubject<boolean>(1);

  public settings$ = this.store.select(selectSettings);
  public workouts$ = this.store.select(selectWorkouts);
  public eventDelays$ = this.store.select(selectEventDelays);
  public eventRepeats$ = this.store.select(selectEventRepeats);

  public form = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control<string>('', [Validators.required]),
    workout: this.fb.nonNullable.control<WithId<Workout> | null>(null, [
      Validators.required,
    ]),
    end: this.fb.nonNullable.control<string>(new Date().toISOString(), [
      Validators.required,
    ]),
    start: this.fb.nonNullable.control<string>(new Date().toISOString(), [
      Validators.required,
    ]),
    delay: this.fb.nonNullable.control<WithId<EventDelay> | null>(null, [
      Validators.required,
    ]),
    repeat: this.fb.nonNullable.control<WithId<EventRepeat> | null>(null, [
      Validators.required,
    ]),
    completed: this.fb.nonNullable.control<boolean>(false),
  });

  public constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  public get title() {
    return this.form.controls.title;
  }

  public get workout() {
    return this.form.controls.workout;
  }

  public ngOnInit(): void {
    this.settings$
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => this.form.patchValue(x.events));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onCancel() {
    this.router.navigate(['app', 'events', 'schedule']);
  }

  public onSave() {
    const payload = this.form.getRawValue() as NonNullable<Event>;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(EventActions.addone({ payload }));
  }
}
