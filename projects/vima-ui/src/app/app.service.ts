import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { AdminComponent, AdminService } from "admin";
import { DashboardComponent, DashboardService } from "dashboard";
import { InventoryComponent, InventoryService } from "inventory";
import { ReportsComponent, ReportsService } from "reports";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private serverUrl = 'http://localhost:4000';
  private routes = [];

  constructor(
    private adminService: AdminService,
    private dashboardService: DashboardService,
    private inventoryService: InventoryService,
    private reportsService: ReportsService,
    private http: HttpClient
  ) {}

  getNavLinks = (): Observable<any> => {
    return this.http.get(`${this.serverUrl}/navigationLinks`);
  };

  setViewConfig = (view): void => {
    this.getViewConfig(view).subscribe(config => {
      const service = `${view}Service`;
      if (this[service] && this[service].setView) {
        this[service].setView(config);
      }
    });
  };

  getViewConfig = (view): Observable<any> => {
    if (view === 'dashboard') {
      return this.http.get(`${this.serverUrl}/dashboard`);
    } else {
      const configMap = {
        'inventory': null,
        'reports': null,
        'admin': null
      };
      return of(configMap[view]);
    }
  };

  getComponent = (componentName): any => {
    const map = {
      'AdminComponent': AdminComponent,
      'DashboardComponent': DashboardComponent,
      'InventoryComponent': InventoryComponent,
      'ReportsComponent': ReportsComponent
    };
    return map[componentName];
  };

}
