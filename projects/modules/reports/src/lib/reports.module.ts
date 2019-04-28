import { NgModule } from '@angular/core';
import { ReportsComponent } from './reports.component';
import { GridsterModule } from "angular-gridster2";
import { DynamicModule } from "ng-dynamic-component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material";
import { ErrorWidgetComponent } from "./widgets/error-widget/error-widget.component";
import { ReportsWidgetComponent } from "./widgets/reports-widget/reports-widget.component";

@NgModule({
  declarations: [
    ReportsComponent,
    ErrorWidgetComponent,
    ReportsWidgetComponent
  ],
  imports: [
    CommonModule,
    DynamicModule.withComponents([
      ErrorWidgetComponent,
      ReportsWidgetComponent
    ]),
    GridsterModule,
    MatCardModule
  ],
  exports: [
    ReportsComponent,
    ErrorWidgetComponent,
    ReportsWidgetComponent
  ],
  entryComponents: [
    ReportsComponent,
    ErrorWidgetComponent,
    ReportsWidgetComponent
  ]
})
export class ReportsModule { }
