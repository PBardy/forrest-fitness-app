import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  templateUrl: './contents.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentsComponent {}
