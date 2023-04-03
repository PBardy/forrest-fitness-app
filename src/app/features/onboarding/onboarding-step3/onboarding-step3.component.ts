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
import { selectSexes } from '@app/store/sex/sex.selectors';
import { LetModule } from '@ngrx/component';

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

  public sexes$ = this.store.select(selectSexes);

  public constructor(private readonly store: Store) {}

  public get sex() {
    return this.form.controls['sex'];
  }

  public onSubmit() {
    if (this.sex.invalid) {
      this.sex.markAsTouched();
      return;
    }

    this.onNext.emit();
  }
}
