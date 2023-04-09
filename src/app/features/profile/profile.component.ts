import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { selectProfile } from '@app/store/profile/profile.selectors';
import { LetModule } from '@ngrx/component';
import { AgePipe } from '@pipes/age.pipe';
import { filter } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FontAwesomeModule,
    LetModule,
    AgePipe,
  ],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public profile$ = this.store.select(selectProfile).pipe(filter(Boolean));

  public constructor(private readonly store: Store) {}
}
