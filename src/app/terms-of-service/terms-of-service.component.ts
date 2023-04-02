import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [CommonModule, IonicModule, FontAwesomeModule],
  templateUrl: './terms-of-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsOfServiceComponent {}
