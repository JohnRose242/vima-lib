import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppService } from "./app.service";
import { AppComponent } from './app.component';
import { TopbarComponent } from "./topbar/topbar.component";

import { AdminModule } from "admin";
import { DashboardModule } from "dashboard";
import { InventoryModule } from "inventory";
import { ReportsModule } from "reports";
import { ThemeModule } from "theme";

import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  declarations: [ AppComponent, TopbarComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    DashboardModule,
    InventoryModule,
    ReportsModule,
    ThemeModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [ AppService ],
  bootstrap: [ AppComponent ],
  entryComponents: [ TopbarComponent]
})
export class AppModule { }
