import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-schedule.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewScheduleComponent {

}
