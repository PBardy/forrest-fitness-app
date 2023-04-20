import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { selectActivityLevels } from '@app/store/activity-level/activity-level.selectors';
import { ToastService } from '@services/toast.service';

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

  private readonly store = inject(Store);
  private readonly toast = inject(ToastService);

  public activityLevels$ = this.store.select(selectActivityLevels);

  public get activityLevel() {
    return this.form.controls['activityLevel'];
  }

  public async onSubmit() {
    if (this.activityLevel.invalid) {
      this.activityLevel.markAsTouched();
      await this.toast.present({ message: 'Invalid activity level' });
      return;
    }

    this.onNext.emit();
  }
}
