import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapWidgetComponent } from "./map-widget.component";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('MapWidgetComponent', () => {
  let component: MapWidgetComponent;
  let fixture: ComponentFixture<MapWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        MapWidgetComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
