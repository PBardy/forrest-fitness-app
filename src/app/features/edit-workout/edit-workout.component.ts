import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-workout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-workout.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditWorkoutComponent {

}
