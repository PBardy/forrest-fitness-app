import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnboardingStep1Component } from './onboarding-step1/onboarding-step1.component';
import { OnboardingStep2Component } from './onboarding-step2/onboarding-step2.component';
import { OnboardingStep3Component } from './onboarding-step3/onboarding-step3.component';
import { OnboardingStep4Component } from './onboarding-step4/onboarding-step4.component';
import { OnboardingStep5Component } from './onboarding-step5/onboarding-step5.component';
import { BehaviorSubject } from 'rxjs';
import { ActivityLevel, Sex } from '@types';
import { Store } from '@ngrx/store';
import { ProfileActions } from '@app/store/profile/profile.actions';
import { Profile } from '@types';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    OnboardingStep1Component,
    OnboardingStep2Component,
    OnboardingStep3Component,
    OnboardingStep4Component,
    OnboardingStep5Component,
  ],
  templateUrl: './onboarding.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingComponent {
  public step$ = new BehaviorSubject<number>(1);

  public readonly form = this.fb.nonNullable.group({
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
    sex: this.fb.nonNullable.control<Sex | null>(null, [Validators.required]),
    dob: this.fb.nonNullable.control<string | null>(null, [
      Validators.required,
    ]),
    activityLevel: this.fb.nonNullable.control<ActivityLevel | null>(null, [
      Validators.required,
    ]),
  });

  public constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  public onSubmit() {
    const payload = this.form.getRawValue() as NonNullable<Profile>;
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(ProfileActions.set({ payload }));
  }
}
