import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherListItemComponent } from './components/current-weather-list-item/current-weather-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForecastWeatherListItemComponent } from './components/forecast-weather-list-item/forecast-weather-list-item.component';

@NgModule({
  declarations: [
    CurrentWeatherListItemComponent,
    ForecastWeatherListItemComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CurrentWeatherListItemComponent,
    ForecastWeatherListItemComponent,
  ],
})
export class SharedModule {}
