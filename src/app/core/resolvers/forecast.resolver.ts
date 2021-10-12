import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';

@Injectable({
  providedIn: 'root',
})
export class ForecastResolver implements Resolve<boolean> {
  constructor(private weatherService: WeatherService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.weatherService
      .getForecastByZipCode(route.params['zipCode'])
      .pipe(
        catchError(() => {
          this.router.navigate(['/']);
          return of(null);
        })
      );
  }
}
