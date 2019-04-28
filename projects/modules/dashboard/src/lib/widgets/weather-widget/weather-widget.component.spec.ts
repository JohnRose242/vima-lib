import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherWidgetComponent } from "./weather-widget.component";
import { WeatherService } from './service/weather.service';
import { SpeedUnitPipe } from './pipes/speed-unit.pipe';
import { TempUnitPipe } from './pipes/temp-unit.pipe';
import { WindDirectionPipe } from './pipes/wind-direction.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockWeatherService {
  getCurrentWeather() {};
  getWeatherForecast() {};
}

describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;
  let service: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [
        SpeedUnitPipe,
        TempUnitPipe,
        WeatherWidgetComponent,
        WindDirectionPipe
      ],
      providers: [
        {
          provide: WeatherService,
          useClass: MockWeatherService
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    service = TestBed.get(WeatherService);
    fixture.detectChanges();
  });

  it('should create', () => {

  });

});
