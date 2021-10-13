import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WeatherInfo } from '../models/weather-info';
import { ForecastInfo } from '../models/forecast-info';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily';
  apiKey = '5a4b2d457ecbef9eb2a71e480b947604';

  constructor(private http: HttpClient) {}

  getCurrentWeatherAllLocations(): Observable<WeatherInfo[]> {
    let zipCodesArray: string[] = [];
    let requestArray: Observable<any>[] = [];
    let resultsObs: Observable<WeatherInfo[]>;

    if (localStorage.getItem('zipCodes')) {
      zipCodesArray = JSON.parse(localStorage.getItem('zipCodes')!);
      zipCodesArray.forEach((zipCode) => {
        requestArray.push(this.getCurrentWeatherByZipCode(zipCode));
      });
    }

    resultsObs = forkJoin(requestArray);

    return resultsObs;
  }

  getCurrentWeatherByZipCode(zipCode: string): Observable<WeatherInfo> {
    return this.http
      .get(
        `${this.currentWeatherUrl}?zip=${zipCode},fr&units=metric&appid=${this.apiKey}`
      )
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
    return this.getCurrentWeatherByZipCode(zipCode).pipe(
      tap(() => {
        let zipCodesArray: string[] = [];

        if (localStorage.getItem('zipCodes')) {
          zipCodesArray = JSON.parse(localStorage.getItem('zipCodes')!);
        }

        zipCodesArray.push(zipCode);
        localStorage.setItem('zipCodes', JSON.stringify(zipCodesArray));
      })
    );
  }

  deleteZipCode(zipCode: string): void {
    const zipCodesArray = JSON.parse(localStorage.getItem('zipCodes')!);

    const indexToDelete = zipCodesArray.indexOf(zipCode);
    zipCodesArray.splice(indexToDelete, 1);

    localStorage.setItem('zipCodes', JSON.stringify(zipCodesArray));
  }

  getForecastByZipCode(zipCode: string): Observable<ForecastInfo> {
    return this.http
      .get(
        `${this.forecastUrl}?zip=${zipCode},fr&units=metric&cnt=5&appid=${this.apiKey}`
      )
      .pipe(
        map((result: any) => {
          return result.list.map(
            (item: any) =>
              ({
                cityName: result.city.name,
                date: new Date(item.dt * 1000),
                conditions: item.weather[0].main,
                maxTemp: item.temp.max,
                minTemp: item.temp.min,
              } as ForecastInfo)
          );
        })
      );
  }
}
