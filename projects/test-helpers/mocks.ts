import { Injectable } from '@angular/core';
import { Chance } from 'chance';
import { ErrorWidgetComponent } from "../modules/dashboard/src/lib/widgets/error-widget/error-widget.component";
const chance = new Chance();

@Injectable()
export class Mocks {
  private combine = (base, partial) => ({...base, ...partial});

  public dashboardView(count = 5, partial?): Array<any> {
    return Array(count).fill(null).map(() => this.gridsterItem(partial));
  }

  public gridsterItem(partial?): any {
    const widgets = [
      'ChartWidgetComponent',
      'ErrorWidgetComponent',
      'MapWidgetComponent',
      'NotificationsWidgetComponent',
      'TableWidgetComponent',
      'WeatherWidgetComponent'
    ];
    const item = {
      cols: chance.integer({min: 1, max: 12}),
      rows: chance.integer({min: 1, max: 12}),
      x: 0,
      y: 0,
      component: chance.pickone(widgets),
      inputs: {}
    };
    return this.combine(item, partial);
  }

  public gridsterOptions(partial?): any {
    const options = {
      draggable: {
        enabled: chance.bool(),
        ignoreContent: chance.bool()
      },
      resizable: {
        enabled: chance.bool()
      },
      pushItems: chance.bool(),
      minCols: chance.integer({min: 1, max: 12}),
      minRows: chance.integer({min: 1, max: 12}),
      maxCols: chance.integer({min: 1, max: 12}),
      maxRows: chance.integer({min: 1, max: 12}),
      outerMargin: chance.bool(),
      margin: chance.integer({min: 1, max: 10}),
      disableWarnings: chance.bool(),
      responsive: chance.bool()
    };
    return this.combine(options, partial);
  }

}


