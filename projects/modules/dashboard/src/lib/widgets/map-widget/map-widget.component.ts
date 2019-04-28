import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DataService } from "../../dashboard-data.service";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";

interface Marker {
  id: string;
  name: string;
  latitude: number,
  longitude: number
}

@Component({
  selector: 'vima-map-widget',
  templateUrl: './map-widget.component.html',
  styleUrls: ['./map-widget.component.scss']
})
export class MapWidgetComponent implements OnInit, OnDestroy {

  @Input() dataSource;

  @Input() mapTypeId;

  @Input() zoom;

  public markers: Array<Marker>;
  public map: any;
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getData(this.dataSource).pipe(take(1)).subscribe(data => {
      this.markers = data;
    });
  }

  setMap(mapInstance): void {
    this.map = mapInstance;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
