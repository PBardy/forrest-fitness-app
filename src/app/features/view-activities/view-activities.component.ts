import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRefresher, IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Activity, Model } from '@types';
import { ActivityActions } from '@app/store/activity/activity.actions';
import {
  selectActivities,
  selectActivitiesByDay,
  selectActivitiesByDayAndTitle,
  selectActivitiesByTitle,
  selectActivitiesTotal,
} from '@app/store/activity/activity.selectors';
import { LetModule } from '@ngrx/component';
import { ActivityEndPipe } from '@pipes/activity-end.pipe';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, startWith, switchMap } from 'rxjs';

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
    FormsModule,
  ],
  templateUrl: './view-activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewActivitiesComponent {
  public search = '';
  public searchSub$ = new Subject<string>();

  public activitiesTotal$ = this.store.select(selectActivitiesTotal);
  public activities$ = this.searchSub$.pipe(
    startWith(''),
    switchMap((title) =>
      this.store.select(selectActivitiesByDayAndTitle(title))
    )
  );

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

  public onAdd() {
    this.router.navigate(['app', 'activities', 'new']);
  }

  public onRecord() {
    this.router.navigate(['app', 'activities', 'record']);
  }
}
