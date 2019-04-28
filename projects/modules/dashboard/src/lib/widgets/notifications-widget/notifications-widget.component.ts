import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DataService } from "../../dashboard-data.service";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { animate, state, style, transition, trigger } from '@angular/animations';

interface Notification {
  id: string;
  date: number;
  message: string;
  read: boolean;
  status: 'normal' | 'alert';
  subject: string;
}

@Component({
  selector: 'vima-notifications-widget',
  templateUrl: './notifications-widget.component.html',
  styleUrls: ['./notifications-widget.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class NotificationsWidgetComponent implements OnInit, OnDestroy {

  @Input() dataSource;

  public notifications: Array<Notification>;
  public regularCount: number;
  public alertCount: number;
  public columnsToDisplay = ['status', 'date', 'subject', 'read'];
  public expandedItem: string;
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  // TODO This is just to set up some client-initiated requests. Moving forward would require setting up HTTP long pulling.
  ngOnInit(): void {
    this.getNotifications();
    setInterval(() => {
      this.getNotifications();
    }, 300000);
  }

  getNotifications(): void {
    this.dataService.getData(this.dataSource).pipe(take(1)).subscribe(data => {
      this.notifications = data;
      this.setBadgeCounts();
    });
  }

  setBadgeCounts(): void {
    this.regularCount = 0;
    this.alertCount = 0;
    this.notifications.forEach(note => {
      this.regularCount = note.status === 'normal' && !note.read ? this.regularCount + 1 : this.regularCount;
      this.alertCount = note.status === 'alert' && !note.read ? this.alertCount + 1 : this.alertCount;
    })
  }

  markAsRead(note): void {
    if (!note.read) {
      note.read = true;
      this.dataService.updateData(this.dataSource, this.notifications).pipe(take(1)).subscribe(resp => {
        this.notifications = resp;
        this.expandedItem = note.id;
        this.setBadgeCounts();
      })
    } else {
      this.expandedItem = this.expandedItem === note.id ? null : note.id;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
