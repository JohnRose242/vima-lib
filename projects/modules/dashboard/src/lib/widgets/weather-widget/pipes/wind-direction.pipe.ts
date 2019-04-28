import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'windDirection'
})
export class WindDirectionPipe implements PipeTransform {
  transform(deg: number): string {
    const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    deg += 22.5;
    if (deg < 0) {
      deg = 360 - Math.abs(deg) % 360;
    } else {
      deg = deg % 360;
    }
    const which = Math.round(deg / 45);
    return sectors[which];
  }
}
