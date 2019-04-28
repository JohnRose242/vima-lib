import { Component, OnInit } from '@angular/core';
import { GridsterItem, GridsterConfig } from "angular-gridster2";
import { AdminService } from "./admin.service";

@Component({
  selector: 'vima-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  // Gridster Options
  public options: GridsterConfig;

  // Gridster Items
  public items: GridsterItem[];

  constructor(
    private service: AdminService
  ) { }

  ngOnInit() {
    this.options = this.service.getGridsterOptions();
    this.items = this.service.getView();
  }

}
