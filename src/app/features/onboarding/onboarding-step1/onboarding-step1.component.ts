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
  selector: 'app-onboarding-step1',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './onboarding-step1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStep1Component {
  @Input() public form: FormGroup;
  @Output() public onPrev = new EventEmitter<void>();
  @Output() public onNext = new EventEmitter<void>();

  public get height() {
    return this.form.controls['height'];
  }

  public onSubmit() {
    if (this.height.invalid) {
      this.height.markAsTouched();
      return;
    }

    this.onNext.emit();
  }
}
