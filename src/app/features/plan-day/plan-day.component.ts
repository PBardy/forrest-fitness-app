import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-day.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanDayComponent {

}
