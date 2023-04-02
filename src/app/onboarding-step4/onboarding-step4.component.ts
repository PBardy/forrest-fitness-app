import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding-step4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-step4.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingStep4Component {

}
