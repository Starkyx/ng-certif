import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherListItemComponent } from './components/current-weather-list-item/current-weather-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CurrentWeatherListItemComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, CurrentWeatherListItemComponent],
})
export class SharedModule {}
