import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-onboarding-step4',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FontAwesomeModule],
  templateUrl: './onboarding-step4.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStep4Component {}
