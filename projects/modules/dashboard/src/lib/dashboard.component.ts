import { Component, OnInit } from '@angular/core';
import { GridsterItem, GridsterConfig } from "angular-gridster2";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: 'vima-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Gridster Options
  public options: GridsterConfig;

  // Gridster Items
  public items: GridsterItem[];

  // View Ready
  public ready = false;

  constructor(
    private service: DashboardService
  ) { }

  ngOnInit() {
    this.options = this.service.getGridsterOptions();
    this.service.viewChange.subscribe(changed => {
      if (changed) {
        this.items = this.service.getView();
        this.ready = true;
      }
    });
  }

}
