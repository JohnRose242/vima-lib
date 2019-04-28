import { NgModule } from '@angular/core';
import { InventoryComponent } from './inventory.component';
import { GridsterModule } from "angular-gridster2";
import { DynamicModule } from "ng-dynamic-component";
import { CommonModule } from "@angular/common";
import { InventoryService } from "./inventory.service";
import { MatCardModule } from "@angular/material";
import { ErrorWidgetComponent } from "./widgets/error-widget/error-widget.component";

@NgModule({
  declarations: [
    InventoryComponent,
    ErrorWidgetComponent
  ],
  imports: [
    CommonModule,
    DynamicModule.withComponents([

    ]),
    GridsterModule,
    MatCardModule
  ],
  providers: [ InventoryService ],
  exports: [
    InventoryComponent,
    ErrorWidgetComponent
  ],
  entryComponents: [
    InventoryComponent,
    ErrorWidgetComponent
  ]
})
export class InventoryModule { }
