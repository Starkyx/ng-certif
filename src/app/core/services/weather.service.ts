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
    let resultsObs: Observable<any>;

    if (localStorage.getItem('zipCodes')) {
      zipCodesArray = JSON.parse(localStorage.getItem('zipCodes')!);
      zipCodesArray.forEach((zipCode) => {
        requestArray.push(this.getCurrentWeather(zipCode));
      });
    }

    resultsObs = forkJoin(requestArray).pipe(
      map((items) =>
        items.map(
          (item, index) =>
            ({
              cityName: item.name,
              zipCode: zipCodesArray[index],
              currentConditions: item.weather[0].main,
              currentTemp: item.main.temp,
              maxTemp: item.main.temp_max,
              minTemp: item.main.temp_min,
            } as WeatherInfo)
        )
      )
    );

    return resultsObs;
  }

  getCurrentWeather(zipCode: string) {
    return this.http.get(
      `${this.currentWeatherUrl}?zip=${zipCode},fr&appid=${this.apiKey}`
    );
  }

  saveZipCode(zipCode: string) {
    let zipCodesArray: string[] = [];

    if (localStorage.getItem('zipCodes')) {
      zipCodesArray = JSON.parse(localStorage.getItem('zipCodes')!);
    }

    zipCodesArray.push(zipCode);
    localStorage.setItem('zipCodes', JSON.stringify(zipCodesArray));
  }
}
