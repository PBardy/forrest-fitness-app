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
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'app-onboarding-step6',
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
  templateUrl: './onboarding-step6.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStep6Component {
  @Input() public form: FormGroup;
  @Output() public onPrev = new EventEmitter<void>();
  @Output() public onNext = new EventEmitter<void>();

  public get name() {
    return this.form.controls['name'];
  }

  public onSubmit() {
    if (this.name.invalid) {
      this.name.markAsTouched();
      return;
    }

    this.onNext.emit();
  }
}
