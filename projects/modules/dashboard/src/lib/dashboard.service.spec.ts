import { TestBed, getTestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { ChartWidgetComponent } from "./widgets/chart-widget/chart-widget.component";
import { ErrorWidgetComponent } from "./widgets/error-widget/error-widget.component";
import { MapWidgetComponent } from "./widgets/map-widget/map-widget.component";
import { NotificationsWidgetComponent } from "./widgets/notifications-widget/notifications-widget.component";
import { TableWidgetComponent } from "./widgets/table-widget/table-widget.component";
import { WeatherWidgetComponent } from "./widgets/weather-widget/weather-widget.component";
import { Chance } from 'chance';
import { Mocks } from "../../../../test-helpers/mocks";
const chance = new Chance();
const mocks = new Mocks();

describe('DashboardService', () => {
  let injector: TestBed;
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardService]
    });
    injector = getTestBed();
    service = injector.get(DashboardService);
  });

  it('should be created', () => {
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });

  describe('Scenario: setView', () => {
    it('should have a setView function', () => {
      expect(service.setView).toBeDefined();
      expect(typeof service.setView === 'function').toBe(true);
    });

    it('should set the view, adding the appropriate component to the widgets', () => {
      const expectedView = mocks.dashboardView();
      service.setView(expectedView);
      expect(service['view']).toEqual(expectedView);
    });
  });

  describe('Scenario: getView', () => {
    it('should have a getView function', () => {
      expect(service.getView).toBeDefined();
      expect(typeof service.getView === 'function').toBe(true);
    });

    it('should return the view', () => {
      const expectedView = mocks.dashboardView();
      service.setView(expectedView);
      const view  = service.getView();
      expect(view).toEqual(expectedView);
    });
  });

  describe('Scenario: setGridsterOptions', () => {
    it('should have a setGridsterOptions function', () => {
      expect(service.setGridsterOptions).toBeDefined();
      expect(typeof service.setGridsterOptions === 'function').toBe(true);
    });

    it('should set the gridster options', () => {
      const mockOptions = mocks.gridsterOptions();
      service.setGridsterOptions(mockOptions);
      expect(service['options']).toEqual(mockOptions);
    });
  });

  describe('Scenario: getGridsterOptions', () => {
    const mockOptions = mocks.gridsterOptions();

    it('should have a getGridsterOptions function', () => {
      expect(service.getGridsterOptions).toBeDefined();
      expect(typeof service.getGridsterOptions === 'function').toBe(true);
    });

    it('should return the set options', () => {
      service.setGridsterOptions(mockOptions);
      const expectedOptions = service.getGridsterOptions();
      expect(expectedOptions).toEqual(mockOptions);
    });

    it('should return the default options if no options are set', () => {
      service.setGridsterOptions(null);
      const expectedOptions = service.getGridsterOptions();
      expect(expectedOptions).toEqual({
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
      });
    });
  });

  describe('Scenario: getDefaultGridsterOptions', () => {
    it('should have a getDefaultGridsterOptions function', () => {
      expect(service.getDefaultGridsterOptions).toBeDefined();
      expect(typeof service.getDefaultGridsterOptions === 'function').toBe(true);
    });

    it('should return the default options', () => {
      const options  = service.getDefaultGridsterOptions();
      expect(options).toEqual({
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
      });
    });
  });

  describe('Scenario: getDefaultGridsterItems', () => {
    it('should have a getDefaultGridsterItems function', () => {
      expect(service.getDefaultGridsterItems).toBeDefined();
      expect(typeof service.getDefaultGridsterItems === 'function').toBe(true);
    });

    it('should return the default items', () => {
      const items  = service.getDefaultGridsterItems();
      expect(items).toEqual([{
        cols: 3,
        rows: 2,
        x: 0,
        y: 0,
        component: ErrorWidgetComponent,
        inputs: {
          errorType: 'No Dashboard Configuration',
          errorMessage: 'There is no configuration for the dashboard.'
        }
      }]);
    });
  });

  describe('Scenario: getWidgetComponent', () => {
    it('should have a getWidgetComponent function', () => {
      expect(service.getWidgetComponent).toBeDefined();
      expect(typeof service.getWidgetComponent === 'function').toBe(true);
    });

    it('should return the correct component', () => {
      const widget = chance.pickone([
        'ChartWidgetComponent',
        'ErrorWidgetComponent',
        'MapWidgetComponent',
        'NotificationsWidgetComponent',
        'TableWidgetComponent',
        'WeatherWidgetComponent'
      ]);
      const widgetMap = {
        'ChartWidgetComponent': ChartWidgetComponent,
        'ErrorWidgetComponent': ErrorWidgetComponent,
        'MapWidgetComponent': MapWidgetComponent,
        'NotificationsWidgetComponent': NotificationsWidgetComponent,
        'TableWidgetComponent': TableWidgetComponent,
        'WeatherWidgetComponent': WeatherWidgetComponent
      };
      const response = service.getWidgetComponent(widget);
      expect(response).toEqual(widgetMap[widget]);
    });
  });
});
