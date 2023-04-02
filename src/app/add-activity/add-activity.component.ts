import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-activity.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddActivityComponent {

}
