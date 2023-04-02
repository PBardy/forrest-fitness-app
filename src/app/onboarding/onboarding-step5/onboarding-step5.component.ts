import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-onboarding-step5',
  standalone: true,
  imports: [CommonModule, IonicModule, FontAwesomeModule, RouterModule],
  templateUrl: './onboarding-step5.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStep5Component {}
