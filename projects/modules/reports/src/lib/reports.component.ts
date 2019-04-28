import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from "angular-gridster2";
import { ReportsService } from "./reports.service";

@Component({
  selector: 'vima-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  // Gridster Options
  public options: GridsterConfig;

  // Gridster Items
  public items: GridsterItem[];

  constructor(
    private service: ReportsService
  ) { }

  ngOnInit() {
    this.options = this.service.getGridsterOptions();
    this.items = this.service.getView();
  }

}
