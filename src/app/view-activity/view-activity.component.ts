import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-activity.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewActivityComponent {

}
