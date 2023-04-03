import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { selectActivityLevels } from '@app/store/activity-level/activity-level.selectors';

@Component({
  selector: 'app-onboarding-step5',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LetModule,
  ],
  templateUrl: './onboarding-step5.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStep5Component {
  @Input() public form: FormGroup;
  @Output() public onPrev = new EventEmitter<void>();
  @Output() public onNext = new EventEmitter<void>();

  public activityLevels$ = this.store.select(selectActivityLevels);

  public constructor(private readonly store: Store) {}

  public get activityLevel() {
    return this.form.controls['activityLevel'];
  }

  public onSubmit() {
    if (this.activityLevel.invalid) {
      this.activityLevel.markAsTouched();
      return;
    }

    this.onNext.emit();
  }
}
