import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-onboarding-step4',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './onboarding-step4.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStep4Component {
  @Input() public form: FormGroup;
  @Output() public onPrev = new EventEmitter<void>();
  @Output() public onNext = new EventEmitter<void>();

  public get activity() {
    return this.form.controls['dob'];
  }

  public get dob() {
    return this.form.controls['dob'];
  }

  public onSubmit() {
    if (this.dob.invalid) {
      this.dob.markAsTouched();
      return;
    }

    this.onNext.emit();
  }
}
