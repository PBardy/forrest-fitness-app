import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { parseISO } from 'date-fns';

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
  public destroy$ = new ReplaySubject<boolean>(1);

  public form = this.fb.nonNullable.group({
    date: this.fb.nonNullable.control<string>(new Date().toISOString(), [
      Validators.required,
    ]),
    events: this.fb.nonNullable.array([]),
  });

  public constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  public get date() {
    return this.form.controls.date;
  }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((x) => x.get('date') as string),
        map((x) => (x ? parseISO(x) : new Date()))
      )
      .subscribe((x) => this.date.patchValue(x.toISOString()));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onCancel() {
    this.router.navigate(['app', 'events']);
  }

  public onSave() {}
}
