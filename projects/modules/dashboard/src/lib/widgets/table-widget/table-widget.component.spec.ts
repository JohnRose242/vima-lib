import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableWidgetComponent } from "./table-widget.component";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatTableModule } from "@angular/material";

describe('TableWidgetComponent', () => {
  let component: TableWidgetComponent;
  let fixture: ComponentFixture<TableWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule
      ],
      declarations: [
        TableWidgetComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
