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
import { ToastService } from '@services/toast.service';

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

  private readonly toast = inject(ToastService);

  public get weight() {
    return this.form.controls['weight'];
  }

  public async onSubmit() {
    if (this.weight.invalid) {
      this.weight.markAsTouched();
      await this.toast.present({ message: 'Invalid height' });
      return;
    }

    this.onNext.emit();
  }
}
