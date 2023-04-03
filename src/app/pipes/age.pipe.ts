import { Pipe, PipeTransform } from '@angular/core';
import { differenceInYears, parseISO } from 'date-fns';

@Pipe({
  name: 'age',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  public transform(value: string) {
    return differenceInYears(parseISO(value), new Date());
  }
}
