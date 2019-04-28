import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem } from "angular-gridster2";
import { ErrorWidgetComponent } from "./widgets/error-widget/error-widget.component";
import { ReportsWidgetComponent } from "./widgets/reports-widget/reports-widget.component";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private view: GridsterItem[];
  private options: GridsterConfig;
  private combine = (base, partial) => ({...base, ...partial});

  constructor() { }

  setView= (items: GridsterItem[]): void => {
    this.view = items;
  };

  getView = (): GridsterItem[] => {
    return this.view ? this.view.map(item => {
      item.component = this.getWidgetComponent(item.componentName);
      return item;
    }) : this.getDefaultGridsterItems();
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
        errorType: 'No Reports View Configuration',
        errorMessage: 'There is no configuration for the reports view.'
      }
    }]
  };

  getWidgetComponent = (componentName): any => {
    const widgetMap = {
      'ErrorWidgetComponent': ErrorWidgetComponent,
      'ReportsWidgetComponent': ReportsWidgetComponent
    };
    return widgetMap[componentName];
  };
}
