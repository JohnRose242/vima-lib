import { Component, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { DataService } from "../../dashboard-data.service";
import * as Chart from 'chart.js';
import { Subject } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: 'vima-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements AfterViewInit, OnDestroy {

  @Input() dataSource;

  @Input() type;

  @Input() title;

  @Input() textColor;

  @Input() showLegend;

  @Input() showXAxis;

  @Input() showYAxis;

  @Input() xAxisLabel;

  @Input() yAxisLabel;

  public chartId = new Date().getTime().toString();
  public canvas: any;
  public ctx: any;
  private chart: Chart;
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private dataService: DataService
  ) {}

  ngAfterViewInit(): void {
    this.canvas = document.getElementById(this.chartId);
    this.ctx = this.canvas.getContext('2d');
    this.getData();
  }

  getData(): void {
    this.dataService.getData(this.dataSource).pipe(take(1)).subscribe(data => {
      this.chart = new Chart(this.ctx, {
        type: this.type,
        data: {
          labels: data.labels,
          datasets: this.getDatasets(data.data)
        },
        options: {
          legend: {
            display: this.showLegend || false,
            labels: {
              fontColor: this.textColor || "#FFF"
            }
          },
          responsive: true,
          scales: {
            xAxes: [{
              display: this.showXAxis || true,
              ticks: {
                fontColor: this.textColor || '#FFF'
              },
              scaleLabel: {
                display: Boolean(this.xAxisLabel),
                labelString: this.xAxisLabel,
                fontColor: this.textColor || '#FFF'
              }
            }],
            yAxes: [{
              display: this.showYAxis || true,
              ticks: {
                fontColor: this.textColor || '#FFF'
              },
              scaleLabel: {
                display: Boolean(this.yAxisLabel),
                labelString: this.yAxisLabel,
                fontColor: this.textColor || '#FFF'
              }
            }],
            gridLines: {
              display: false
            }
          },
          title: {
            display: Boolean(this.title),
            text: this.title,
            fontColor: this.textColor || '#FFF'
          },
          elements: {
            line: {
              tension: 0
            }
          }
        }
      });
    });
  }

  getDatasets(data) {
    switch(this.type) {
      case 'line':
        return data.map((entry, index) => {
          return {
            data: entry.data,
            label: entry.label,
            backgroundColor: this.getColor(index, .75),
            borderColor: this.getColor(index, 1),
            fill: false
          };
        });
      case 'bar':
      case 'bubble':
        return data.map((entry) => {
          return {
            label: entry.label,
            data: entry.data,
            backgroundColor: entry.data.map((entry, index) =>this.getColor(index, .75)),
            borderColor: entry.data.map((entry, index) =>this.getColor(index, 1))
          };
      });
      case 'pie':
      case 'polarArea':
      case 'doughnut':
      case 'horizontalBar':
        return data.map((entry) => {
          return {
            label: entry.label,
            data: entry.data,
            backgroundColor: entry.data.map((entry, index) =>this.getColor(index, .75)),
          };
        });
      case 'radar':
        return data.map((entry) => {
          return {
            label: entry.label,
            data: entry.data,
            backgroundColor: entry.data.map((entry, index) =>this.getColor(index, .75)),
            borderColor: entry.data.map((entry, index) =>this.getColor(index, 1)),
            pointBorderColor: "#fff",
            pointBackgroundColor: entry.data.map((entry, index) =>this.getColor(index, .5)),
            fill: true
          };
        });
      default:
        return [];
    }
  }

  getColor = (index, a): string => {
    const colors = [
      {r: 63, g: 63, b: 191}, {r: 63, g: 127, b: 191}, {r: 63, g: 191, b: 191},
      {r: 63, g: 191, b: 127}, {r: 63, g: 191, b: 63}, {r: 127, g: 191, b: 63},
      {r: 191, g: 191, b: 63}, {r: 191, g: 127, b: 63}, {r: 191, g: 63, b: 63},
      {r: 191, g: 63, b: 127}, {r: 191, g: 63, b: 191}, {r: 127, g: 63, b: 191}
    ];
    return `rgba(${colors[index].r}, ${colors[index].g}, ${colors[index].b}, ${a})`;
  };

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
