import { Pipe, PipeTransform } from '@angular/core';
import { secondsToHours, secondsToMinutes } from 'date-fns';

@Pipe({
  name: 'stopwatch',
  standalone: true,
})
export class StopwatchPipe implements PipeTransform {
  public transform(x: number): string {
    const h = secondsToHours(x);
    const m = secondsToMinutes(x) - h * 60;
    const s = x - h * 3600 - m * 60;

    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
  }
}
