import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-record-activity',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FontAwesomeModule],
  templateUrl: './record-activity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordActivityComponent {}
