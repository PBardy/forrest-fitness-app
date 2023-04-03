import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-activity.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditActivityComponent {

}
