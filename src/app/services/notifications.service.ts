import { Injectable } from '@angular/core';
import { registerPlugin } from '@capacitor/core';
import {
  LocalNotificationsPlugin,
  PendingLocalNotificationSchema,
} from '@capacitor/local-notifications';
import { Event, WithId } from '@types';
import { addMinutes, parseISO } from 'date-fns';
import { BehaviorSubject, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public ln = registerPlugin<LocalNotificationsPlugin>('LocalNotifications');
  public pending$ = new BehaviorSubject<PendingLocalNotificationSchema[]>([]);

  public constructor() {
    this.setPending();
  }

  public async setPending() {
    const pending = await this.ln.getPending();
    this.pending$.next(pending.notifications);
  }

  public schedule(event: WithId<Event>) {
    return from(
      this.ln.schedule({
        notifications: [
          {
            id: 0,
            title: `Upcoming: ${event.title}`,
            body: `${event.workout.label}`,
            schedule: {
              at: addMinutes(parseISO(event.start), -(event.delay.by ?? 0)),
              every: event.repeat.every,
            },
            extra: event,
          },
        ],
      })
    ).pipe(switchMap((_) => this.setPending()));
  }

  public unschedule(event: PendingLocalNotificationSchema) {
    return from(
      this.ln.cancel({
        notifications: [{ id: event.id }],
      })
    ).pipe(switchMap((_) => this.setPending()));
  }
}
