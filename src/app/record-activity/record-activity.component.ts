import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-record-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './record-activity.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordActivityComponent {

}
