import { Component, OnInit } from '@angular/core';
import { GridsterItem, GridsterConfig } from "angular-gridster2";
import { InventoryService } from "./inventory.service";

@Component({
  selector: 'vima-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  // Gridster Options
  public options: GridsterConfig;

  // Gridster Items
  public items: GridsterItem[];

  constructor(
    private service: InventoryService
  ) { }

  ngOnInit() {
    this.options = this.service.getGridsterOptions();
    this.items = this.service.getView();
  }

}
