import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonDatetime, IonModal, IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { isAfter, isBefore, parseISO } from 'date-fns';
import { Store } from '@ngrx/store';
import {
  selectEventfulDays,
  selectEventsByDate,
} from '@app/store/event/event.selectors';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { Event, Model, WithId } from '@types';
import { EventActions } from '@app/store/event/event.actions';

@Component({
  selector: 'app-view-schedule',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    LetModule,
  ],
  templateUrl: './view-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewScheduleComponent {
  @ViewChild('modal') public modal: IonModal;

  public current$ = new BehaviorSubject<Date>(new Date());

  public events$ = this.current$.pipe(
    switchMap((x) => this.store.select(selectEventsByDate(x)))
  );

  public eventDates$ = this.store.select(selectEventfulDays).pipe(
    map((x) =>
      x.map((y) => ({
        date: y.toISOString().slice(0, 10),
        textColor: '#fff',
        backgroundColor: 'var(--ion-color-step-300)',
      }))
    )
  );

  public constructor(
    private readonly store: Store,
    private readonly router: Router
  ) {}

  public onClick(event: WithId<Event>) {
    this.router.navigate(['app', 'events', event.id]);
    this.modal.dismiss();
  }

  public onChange(event: any) {
    const target = event.target as IonDatetime;
    const value = target.value as string;

    this.current$.next(parseISO(value));
    this.modal.present();
  }

  public onDelete(payload: Model<Event>) {
    this.store.dispatch(EventActions.deleteone({ payload }));
  }
}
