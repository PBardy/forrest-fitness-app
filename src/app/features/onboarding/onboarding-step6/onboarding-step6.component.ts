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
import { LetModule } from '@ngrx/component';
import { ToastService } from '@services/toast.service';

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

  private readonly toast = inject(ToastService);

  public get name() {
    return this.form.controls['name'];
  }

  public async onSubmit() {
    if (this.name.invalid) {
      this.name.markAsTouched();
      await this.toast.present({ message: 'Display name required' });
      return;
    }

    this.onNext.emit();
  }
}
