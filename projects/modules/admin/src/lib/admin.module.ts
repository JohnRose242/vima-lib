import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { GridsterModule } from "angular-gridster2";
import { DynamicModule } from "ng-dynamic-component";
import { CommonModule } from "@angular/common";
import { AdminService } from "./admin.service";
import { MatCardModule } from "@angular/material";
import { ErrorWidgetComponent } from "./widgets/error-widget/error-widget.component";

@NgModule({
  declarations: [
    AdminComponent,
    ErrorWidgetComponent
  ],
  imports: [
    CommonModule,
    DynamicModule.withComponents([

    ]),
    GridsterModule,
    MatCardModule
  ],
  providers: [ AdminService],
  exports: [
    AdminComponent,
    ErrorWidgetComponent
  ],
  entryComponents: [
    AdminComponent,
    ErrorWidgetComponent
  ]
})
export class AdminModule { }
