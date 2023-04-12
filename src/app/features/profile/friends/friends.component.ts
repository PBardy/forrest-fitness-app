import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    IonicModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './friends.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsComponent {
  public search = '';
  public searchSub$ = new Subject<string>();

  public constructor(private readonly store: Store) {}
}
