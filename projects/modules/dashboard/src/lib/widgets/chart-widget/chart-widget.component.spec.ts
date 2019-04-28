import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartWidgetComponent } from "./chart-widget.component";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('ChartWidgetComponent', () => {
  let component: ChartWidgetComponent;
  let fixture: ComponentFixture<ChartWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        ChartWidgetComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
