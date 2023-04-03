import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectProfile } from '@app/store/profile/profile.selectors';
import { LetModule } from '@ngrx/component';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { selectSexes } from '@app/store/sex/sex.selectors';
import { selectActivityLevels } from '@app/store/activity-level/activity-level.selectors';
import { ActivityLevel, Profile, Sex, WithId } from '@types';
import { ProfileActions } from '@app/store/profile/profile.actions';
import { ReplaySubject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    LetModule,
  ],
  templateUrl: './edit-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent implements OnInit, OnDestroy {
  public destroy$ = new ReplaySubject<boolean>(1);

  public sexes$ = this.store.select(selectSexes);
  public profile$ = this.store.select(selectProfile);
  public activityLevels$ = this.store.select(selectActivityLevels);

  public form = this.fb.group({
    height: this.fb.nonNullable.control<number | null>(null, [
      Validators.required,
      Validators.min(30),
      Validators.max(300),
    ]),
    weight: this.fb.nonNullable.control<number | null>(null, [
      Validators.required,
      Validators.min(40),
      Validators.max(400),
    ]),
    sex: this.fb.nonNullable.control<WithId<Sex> | null>(null, [
      Validators.required,
    ]),
    dob: this.fb.nonNullable.control<string>('', [Validators.required]),
    activityLevel: this.fb.nonNullable.control<WithId<ActivityLevel> | null>(
      null,
      [Validators.required]
    ),
  });

  public constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.profile$
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
    this.router.navigate(['app', 'profile']);
  }

  public onSave() {
    const payload = this.form.getRawValue() as NonNullable<Profile>;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(ProfileActions.update({ payload }));
  }
}
