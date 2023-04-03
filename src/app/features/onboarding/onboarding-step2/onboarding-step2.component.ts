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

@Component({
  selector: 'app-onboarding-step2',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './onboarding-step2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStep2Component {
  @Input() public form: FormGroup;
  @Output() public onPrev = new EventEmitter<void>();
  @Output() public onNext = new EventEmitter<void>();

  public get weight() {
    return this.form.controls['weight'];
  }

  public onSubmit() {
    if (this.weight.invalid) {
      this.weight.markAsTouched();
      return;
    }

    this.onNext.emit();
  }
}
