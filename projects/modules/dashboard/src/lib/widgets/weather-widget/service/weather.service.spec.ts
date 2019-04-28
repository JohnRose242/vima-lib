import { TestBed, inject, async } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Chance } from 'chance';
import { take } from "rxjs/operators";
const chance = new Chance();
const WEATHER_KEY = 'd6ade2a576cc6d1592357ca8daef63ca';

describe('WeatherService', () => {
  let service: WeatherService;
  let backend: HttpTestingController;
  let lat: number;
  let lng: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WeatherService
      ]
    });
  });

  beforeEach(inject([HttpTestingController, WeatherService], (mockBackend, s: WeatherService) => {
    service = s;
    backend = mockBackend;
  }));

  describe('getCurrentWeather', () => {
    it('should send the correct GET request', async(() => {
      const lat = chance.latitude();
      const lon = chance.longitude();
      service.getCurrentWeather(lat, lon)
        .pipe(take(1))
        .subscribe(c => {});
      const call = backend.expectOne(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_KEY}&units=imperial`);
      expect(call.request.method).toEqual('GET');
      backend.verify();
    }));
  });

  describe('getWeatherForecast', () => {
    it('should send the correct GET request', async(() => {
      const lat = chance.latitude();
      const lon = chance.longitude();
      service.getWeatherForecast(lat, lon)
        .pipe(take(1))
        .subscribe(c => {});
      const call = backend.expectOne(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&APPID=${WEATHER_KEY}&units=imperial`);
      expect(call.request.method).toEqual('GET');
      backend.verify();
    }));
  });
});
