import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-summary.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSummaryComponent {

}
