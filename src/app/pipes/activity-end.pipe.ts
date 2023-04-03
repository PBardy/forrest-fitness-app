import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '@types';
import { addSeconds, parseISO } from 'date-fns';

@Pipe({
  name: 'activityEnd',
  standalone: true,
})
export class ActivityEndPipe implements PipeTransform {
  public transform(activity: Activity): Date {
    return addSeconds(parseISO(activity.start), activity.duration ?? 0);
  }
}
