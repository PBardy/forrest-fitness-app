import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Activity, Model } from '@types';
import { ActivityActions } from '@app/store/activity/activity.actions';
import {
  selectActivities,
  selectActivitiesByDay,
} from '@app/store/activity/activity.selectors';
import { LetModule } from '@ngrx/component';
import { ActivityEndPipe } from '@pipes/activity-end.pipe';

@Component({
  selector: 'app-view-activities',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    LetModule,
    RouterModule,
    ActivityEndPipe,
  ],
  templateUrl: './view-activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewActivitiesComponent {
  public activities$ = this.store.select(selectActivities);
  public activitiesGrouped$ = this.store.select(selectActivitiesByDay);

  public constructor(
    private readonly store: Store,
    private readonly router: Router
  ) {}

  public onClick(payload: Model<Activity>) {
    this.router.navigate(['app', 'activities', payload.id]);
  }

  public onDelete(payload: Model<Activity>) {
    this.store.dispatch(ActivityActions.deleteone({ payload }));
  }

  public onRecord() {
    this.router.navigate(['app', 'activites', 'record']);
  }

  public onAdd() {
    this.router.navigate(['app', 'activites', 'new']);
  }
}
