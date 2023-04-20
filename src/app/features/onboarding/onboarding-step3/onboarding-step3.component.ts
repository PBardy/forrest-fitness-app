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
import { selectSexes } from '@app/store/sex/sex.selectors';
import { LetModule } from '@ngrx/component';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-onboarding-step3',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    LetModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './onboarding-step3.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStep3Component {
  @Input() public form: FormGroup;
  @Output() public onPrev = new EventEmitter<void>();
  @Output() public onNext = new EventEmitter<void>();

  private readonly store = inject(Store);
  private readonly toast = inject(ToastService);

  public sexes$ = this.store.select(selectSexes);

  public get sex() {
    return this.form.controls['sex'];
  }

  public async onSubmit() {
    if (this.sex.invalid) {
      this.sex.markAsTouched();
      await this.toast.present({ message: 'Invalid sex' });
      return;
    }

    this.onNext.emit();
  }
}
