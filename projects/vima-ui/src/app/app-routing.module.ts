import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "dashboard";
import { InventoryComponent } from "inventory";
import { ReportsComponent } from "reports";
import { AdminComponent } from "admin";

let routes: Routes = [
  {
    "path": "",
    "component": DashboardComponent
  },
  {
    "path": "inventory",
    "component": InventoryComponent
  },
  {
    "path": "reports",
    "component": ReportsComponent
  },
  {
    "path": "admin",
    "component":  AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
