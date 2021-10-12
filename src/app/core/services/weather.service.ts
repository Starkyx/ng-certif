import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherInfo } from '../models/weather-info';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = '5a4b2d457ecbef9eb2a71e480b947604';

  constructor(private http: HttpClient) {}

  getCurrentWeatherAllLocations(): Observable<any> {
    let zipCodesArray: string[] = [];
    let requestArray: Observable<any>[] = [];
    let resultsObs: Observable<WeatherInfo[]>;

    if (localStorage.getItem('zipCodes')) {
      zipCodesArray = JSON.parse(localStorage.getItem('zipCodes')!);
      zipCodesArray.forEach((zipCode) => {
        requestArray.push(this.getCurrentWeather(zipCode));
      });
    }

    resultsObs = forkJoin(requestArray);

    return resultsObs;
  }

  getCurrentWeather(zipCode: string): Observable<WeatherInfo> {
    return this.http
      .get(`${this.currentWeatherUrl}?zip=${zipCode},fr&appid=${this.apiKey}`)
      .pipe(
        map(
          (item: any) =>
            ({
              cityName: item.name,
              zipCode: zipCode,
              currentConditions: item.weather[0].main,
              currentTemp: item.main.temp,
              maxTemp: item.main.temp_max,
              minTemp: item.main.temp_min,
            } as WeatherInfo)
        )
      );
  }

  saveZipCode(zipCode: string): Observable<WeatherInfo> {
    let zipCodesArray: string[] = [];

    if (localStorage.getItem('zipCodes')) {
      zipCodesArray = JSON.parse(localStorage.getItem('zipCodes')!);
    }

    zipCodesArray.push(zipCode);
    localStorage.setItem('zipCodes', JSON.stringify(zipCodesArray));

    return this.getCurrentWeather(zipCode);
  }
}
