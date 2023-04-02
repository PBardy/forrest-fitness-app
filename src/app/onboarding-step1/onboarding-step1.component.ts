import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding-step1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-step1.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingStep1Component {

}
