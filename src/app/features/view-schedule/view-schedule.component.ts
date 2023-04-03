import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-schedule',
  standalone: true,
  imports: [CommonModule, IonicModule, FontAwesomeModule, RouterModule],
  templateUrl: './view-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewScheduleComponent {}
