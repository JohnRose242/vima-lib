import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorWidgetComponent } from "./error-widget.component";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ErrorWidgetComponent', () => {
  let component: ErrorWidgetComponent;
  let fixture: ComponentFixture<ErrorWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ErrorWidgetComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
