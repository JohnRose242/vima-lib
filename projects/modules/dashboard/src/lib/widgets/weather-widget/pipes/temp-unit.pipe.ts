import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempUnit'
})
export class TempUnitPipe implements PipeTransform {
  transform(temp: number, tempUnit: string): string {
    switch (tempUnit) {
      case 'F':
        return Number(temp).toFixed(0) + '°' + 'F';
      default:
        const celcius = (temp - 32) * 0.5556;
        return Number(celcius).toFixed(0) + '°' + 'C';
    }
  }
}
