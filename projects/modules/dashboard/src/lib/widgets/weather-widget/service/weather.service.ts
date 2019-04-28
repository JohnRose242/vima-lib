import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const WEATHER_KEY = 'd6ade2a576cc6d1592357ca8daef63ca';

@Injectable()

export class WeatherService {

  constructor (
    private http: HttpClient
  ) { }

  getCurrentWeather(lat: number, lon: number): Observable<any> {
    const url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_KEY}&units=imperial`;
    return this.http.get(url)
      .pipe(
        catchError(err => {
          console.error('Unable to get current weather data ', err._body);
          return throwError(err.json());
        })
      );
  }

  // TODO Explore better weather service than OpenWeather or look into paid account.
  getWeatherForecast(lat: number, lon: number): Observable<any> {
    const url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&APPID=${WEATHER_KEY}&units=imperial`;
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('Unable to get forecast weather data ', err._body);
        return throwError(err.json());
      })
    );
  }
}
