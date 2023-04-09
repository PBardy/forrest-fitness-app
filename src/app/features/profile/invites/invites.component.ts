import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule } from '@ngrx/component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-invites',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    IonicModule,
    RouterModule,
    FontAwesomeModule,
  ],
  templateUrl: './invites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitesComponent {}
