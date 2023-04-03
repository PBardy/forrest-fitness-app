import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { Activity } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ActivityService extends ModelService<Activity> {
  protected override path = 'activities';
}
