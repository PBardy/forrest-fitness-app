import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-activities.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewActivitiesComponent {

}
