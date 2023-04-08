import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonMenu, IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActivityActions } from '@app/store/activity/activity.actions';
import { EventActions } from '@app/store/event/event.actions';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, IonicModule, FontAwesomeModule, RouterModule],
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit {
  @ViewChild('menu') public menu: IonMenu;

  public constructor(
    private readonly router: Router,
    private readonly store: Store
  ) {}

  public onClick(path: string) {
    this.menu.toggle();
    this.router.navigateByUrl(path);
  }

  public ngOnInit(): void {
    this.store.dispatch(EventActions.loadall());
    this.store.dispatch(ActivityActions.loadall());
  }
}
