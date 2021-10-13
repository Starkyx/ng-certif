import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherListItemComponent } from './components/current-weather-list-item/current-weather-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForecastWeatherListItemComponent } from './components/forecast-weather-list-item/forecast-weather-list-item.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    CurrentWeatherListItemComponent,
    ForecastWeatherListItemComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CurrentWeatherListItemComponent,
    ForecastWeatherListItemComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}
