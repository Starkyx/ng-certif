import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WeatherInfo } from 'src/app/core/models/weather-info';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  zipCode: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
  ]);
  currentWeatherList: WeatherInfo[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService
      .getCurrentWeatherAllLocations()
      .subscribe((currentWeatherList) => {
        this.currentWeatherList = currentWeatherList;
      });
  }

  submit(): void {
    console.log(this.zipCode.value);
    this.weatherService.saveZipCode(this.zipCode.value);
    this.zipCode.setValue('');
  }
}
