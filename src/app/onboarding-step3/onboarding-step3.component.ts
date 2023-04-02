import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-step3.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingStep3Component {

}
