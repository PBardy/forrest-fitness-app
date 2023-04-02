import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding-step5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-step5.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingStep5Component {

}
