import { Pipe, PipeTransform } from '@angular/core';
import { formatDuration } from 'date-fns';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  public transform(seconds: number) {
    return formatDuration({ seconds });
  }
}
