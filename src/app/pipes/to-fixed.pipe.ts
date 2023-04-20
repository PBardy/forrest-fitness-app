import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed',
  standalone: true,
})
export class ToFixedPipe implements PipeTransform {
  public transform(value: number, digits = 0, dir: 'up' | 'down') {
    const round = dir === 'up' ? Math.floor : Math.ceil;
    return round(value * 10 ** digits) / 10 ** digits;
  }
}
