import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsWidgetComponent } from "./notifications-widget.component";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatTableModule } from "@angular/material";

describe('NotificationsWidgetComponent', () => {
  let component: NotificationsWidgetComponent;
  let fixture: ComponentFixture<NotificationsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule
      ],
      declarations: [
        NotificationsWidgetComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
