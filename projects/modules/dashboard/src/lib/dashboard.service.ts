import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem } from "angular-gridster2";
import { ChartWidgetComponent } from "./widgets/chart-widget/chart-widget.component";
import { ErrorWidgetComponent } from "./widgets/error-widget/error-widget.component";
import { MapWidgetComponent } from "./widgets/map-widget/map-widget.component";
import { NotificationsWidgetComponent } from "./widgets/notifications-widget/notifications-widget.component";
import { TableWidgetComponent } from "./widgets/table-widget/table-widget.component";
import { WeatherWidgetComponent } from "./widgets/weather-widget/weather-widget.component";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public viewChange = new BehaviorSubject(null);
  private view: GridsterItem[];
  private options: GridsterConfig;
  private combine = (base, partial) => ({...base, ...partial});


  constructor() { }

  setView = (items: GridsterItem[]): void => {
    this.view = items.map(item => {
      item.component = this.getWidgetComponent(item.componentName);
      return item;
    });
    this.viewChange.next(true);
  };

  getView = (): GridsterItem[] => {
    return this.view || this.getDefaultGridsterItems();
  };

  setGridsterOptions= (partial?): void => {
    this.options = this.combine(this.getDefaultGridsterOptions(), partial);
  };

  getGridsterOptions = (): GridsterConfig => {
    return this.options || this.getDefaultGridsterOptions();
  };

  getDefaultGridsterOptions = (): GridsterConfig => {
    return {
      draggable: {
        enabled: false,
        ignoreContent: false
      },
      resizable: {
        enabled: false
      },
      pushItems: false,
      minCols: 12,
      minRows: 12,
      maxCols: 12,
      maxRows: 12,
      outerMargin: true,
      margin: 5,
      disableWarnings: true,
      responsive: true
    };
  };

  getDefaultGridsterItems = (): GridsterItem[] => {
    return [{
      cols: 3,
      rows: 2,
      x: 0,
      y: 0,
      component: ErrorWidgetComponent,
      inputs: {
        errorType: 'No Dashboard Configuration',
        errorMessage: 'There is no configuration for the dashboard.'
      }
    }]
  };

  getWidgetComponent = (componentName): any => {
    const widgetMap = {
      'ChartWidgetComponent': ChartWidgetComponent,
      'ErrorWidgetComponent': ErrorWidgetComponent,
      'MapWidgetComponent': MapWidgetComponent,
      'NotificationsWidgetComponent': NotificationsWidgetComponent,
      'TableWidgetComponent': TableWidgetComponent,
      'WeatherWidgetComponent': WeatherWidgetComponent
    };
    return widgetMap[componentName];
  };
}
