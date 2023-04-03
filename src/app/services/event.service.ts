import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { Event } from '@types';

@Injectable({
  providedIn: 'root',
})
export class EventService extends ModelService<Event> {
  protected override path = 'events';
}
