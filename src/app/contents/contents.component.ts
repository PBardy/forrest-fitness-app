import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contents.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentsComponent {}
