import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { GridsterModule } from "angular-gridster2";
import { DynamicModule } from "ng-dynamic-component";
import { CommonModule } from "@angular/common";
import { DashboardService } from "./dashboard.service";
import { MatBadgeModule, MatCardModule, MatIconModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AgmCoreModule } from "@agm/core";

import { ChartWidgetComponent } from "./widgets/chart-widget/chart-widget.component";
import { ErrorWidgetComponent } from "./widgets/error-widget/error-widget.component";
import { MapWidgetComponent } from "./widgets/map-widget/map-widget.component";
import { NotificationsWidgetComponent } from "./widgets/notifications-widget/notifications-widget.component";
import { TableWidgetComponent } from "./widgets/table-widget/table-widget.component";
import { WeatherWidgetComponent } from "./widgets/weather-widget/weather-widget.component";

import { SpeedUnitPipe } from "./widgets/weather-widget/pipes/speed-unit.pipe";
import { TempUnitPipe } from "./widgets/weather-widget/pipes/temp-unit.pipe";
import { WindDirectionPipe } from "./widgets/weather-widget/pipes/wind-direction.pipe";

import { WeatherService } from "./widgets/weather-widget/service/weather.service";

@NgModule({
  declarations: [
    DashboardComponent,
    ChartWidgetComponent,
    ErrorWidgetComponent,
    MapWidgetComponent,
    NotificationsWidgetComponent,
    TableWidgetComponent,
    WeatherWidgetComponent,
    SpeedUnitPipe,
    TempUnitPipe,
    WindDirectionPipe
  ],
  imports: [
    CommonModule,
    DynamicModule.withComponents([
      ChartWidgetComponent,
      ErrorWidgetComponent,
      MapWidgetComponent,
      NotificationsWidgetComponent,
      TableWidgetComponent,
      WeatherWidgetComponent
    ]),
    GridsterModule,
    MatBadgeModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjxra1By_v-gCnqrEN4LG-wUFNqDEfxAA'
    })
  ],
  providers: [
    DashboardService,
    WeatherService
  ],
  exports: [
    DashboardComponent,
    ChartWidgetComponent,
    ErrorWidgetComponent,
    MapWidgetComponent,
    NotificationsWidgetComponent,
    TableWidgetComponent,
    WeatherWidgetComponent,
    SpeedUnitPipe,
    TempUnitPipe,
    WindDirectionPipe
  ],
  entryComponents: [
    DashboardComponent,
    ChartWidgetComponent,
    ErrorWidgetComponent,
    MapWidgetComponent,
    NotificationsWidgetComponent,
    TableWidgetComponent,
    WeatherWidgetComponent
  ]
})
export class DashboardModule { }
