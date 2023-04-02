import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding-step2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-step2.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingStep2Component {

}
