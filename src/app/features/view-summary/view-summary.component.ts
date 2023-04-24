import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  of,
  switchMap,
} from 'rxjs';
import { LetModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import {
  selectSummaryByDate,
  selectSummaryByMonth,
  selectSummaryByWeek,
} from '@app/store/activity/activity.selectors';
import { Range, Summary } from '@types';
import { NotificationsService } from '@services/notifications.service';
import { PendingLocalNotificationSchema } from '@capacitor/local-notifications';

@Component({
  selector: 'app-view-summary',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    LetModule,
  ],
  templateUrl: './view-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSummaryComponent implements OnDestroy {
  public now = new Date();
  public ranges = new Map<Range, Observable<Summary>>([
    ['Daily', this.store.select(selectSummaryByDate(this.now))],
    ['Weekly', this.store.select(selectSummaryByWeek(this.now))],
    ['Monthly', this.store.select(selectSummaryByMonth(this.now))],
  ]);

  public range$ = new BehaviorSubject<Range>('Daily');
  public summary$ = this.range$.pipe(
    switchMap((x) => this.ranges.get(x) as Observable<Summary>)
  );

  public destroy$ = new ReplaySubject<boolean>(1);
  public alerts$ = this.notifications.pending$;

  public constructor(
    private readonly store: Store,
    private readonly notifications: NotificationsService
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onDelete(notification: PendingLocalNotificationSchema) {
    this.notifications.unschedule(notification).subscribe();
  }
}
