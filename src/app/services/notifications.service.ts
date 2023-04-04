import { Injectable } from '@angular/core';
import { registerPlugin } from '@capacitor/core';
import { LocalNotificationsPlugin } from '@capacitor/local-notifications';
import { Event, WithId } from '@types';
import { addMinutes, parseISO } from 'date-fns';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public ln = registerPlugin<LocalNotificationsPlugin>('LocalNotifications');

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
    );
  }
}
