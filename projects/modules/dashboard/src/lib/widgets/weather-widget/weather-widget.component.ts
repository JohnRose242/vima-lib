import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from "./service/weather.service";
import { Subject } from 'rxjs';

class WeatherData {
  constructor (
    public temp: number,
    public summary: string,
    public windSpeed: number,
    public windDirection: number,
    public humidity: number,
    public minTemp: number,
    public maxTemp: number,
    public pressure: number,
    public icon: string
  ) { }
}

interface CurrentWeatherResp {
  base: string;
  clouds: {
    all: number;
  },
  cod: number;
  coord: {
    lon: number;
    lat: number;
  },
  dt: number;
  id: number;
  main: {
    temp: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  name: string;
  sys: {
    id: number;
    message: string | number;
    country: string;
    sunrise: number;
    sunset: number;
    type: number;
  },
  visibility: number;
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  }
}

interface Location {
  name: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'vima-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit, OnDestroy {

  @Input() location: Location;

  @Input() rows: number;

  public weatherData: WeatherData = new WeatherData(null, null, null, null, null, null, null, null, null);
  public forecastData;
  public currentSpeedUnit: 'mph' | 'kph' = 'mph';
  public currentTempUnit: 'F' | 'C' = 'F';
  public date: number;
  public loading = true;
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private service: WeatherService
  ) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      this.getGeoLocation();
    } else {
      this.getCurrentWeather();
    }
    setInterval(() => {
      if (!this.location.lat || !this.location.lng) {
        this.getGeoLocation();
      } else {
        this.getCurrentWeather();
      }
    }, 300000);
  }

  getGeoLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.location = {name: '', lat: position.coords.latitude, lng: position.coords.longitude};
      this.getCurrentWeather();
    }, error => {
      console.log('Unable to get location');
      this.location = {
        name: "No Weather Data",
        lat: null,
        lng: null
      };
      this.loading = false;
    }, {timeout: 10000});
  }

  getCurrentWeather(): void {
    this.loading = true;
    this.service.getCurrentWeather(this.location.lat, this.location.lng)
      .subscribe((data: CurrentWeatherResp) => {
          this.weatherData.temp = data.main.temp;
          this.weatherData.summary = data.weather[0].main;
          this.weatherData.windSpeed = data.wind.speed;
          this.weatherData.windDirection = data.wind.deg;
          this.weatherData.humidity = data.main.humidity;
          this.weatherData.minTemp = data.main.temp_min;
          this.weatherData.maxTemp = data.main.temp_max;
          this.weatherData.pressure = data.main.pressure;
          this.location.name = data.name;
          this.date = data.dt * 1000;
          if (this.rows > 4) {
            this.getForecastWeather();
          } else {
            this.loading = false;
          }
        },
        err => console.error(err));
  }

  getForecastWeather(): void {
    this.service.getWeatherForecast(this.location.lat, this.location.lng)
      .subscribe(data => {
          const forecast = data.list.filter(d => d.dt_txt.includes('15:00:00'));
          this.forecastData = forecast.slice(0, 5);
          this.loading = false;
        },
        err => console.error(err));
  }

  toggleUnits(): void {
    this.currentSpeedUnit === 'kph' ? this.currentSpeedUnit = 'mph' : this.currentSpeedUnit = 'kph';
    this.currentTempUnit === 'C' ? this.currentTempUnit = 'F' : this.currentTempUnit = 'C';
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
