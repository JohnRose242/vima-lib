import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { DataService } from "../../dashboard-data.service";
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Subject } from "rxjs";
import { take } from "rxjs/operators";

interface Column {
  label: string;
  key: string;
}

@Component({
  selector: 'vima-table-widget',
  templateUrl: './table-widget.component.html',
  styleUrls: ['./table-widget.component.scss']
})
export class TableWidgetComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() dataSource;

  public title: string;
  public subtitle: string;
  public columns: Array<Column>;
  public displayedColumns: Array<string>;
  public rows: Array<any>;
  public tableDataSource: MatTableDataSource<any>;
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getData(this.dataSource).pipe(take(1)).subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
      this.columns = data.columns;
      this.displayedColumns = this.columns.map(col => col.key);
      this.tableDataSource = new MatTableDataSource(data.rows);
      this.tableDataSource.paginator = this.paginator;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
