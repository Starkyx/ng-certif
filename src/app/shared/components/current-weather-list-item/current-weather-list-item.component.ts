import { Component, Input, OnInit } from '@angular/core';
import { WeatherInfo } from 'src/app/core/models/weather-info';

@Component({
  selector: 'app-current-weather-list-item',
  templateUrl: './current-weather-list-item.component.html',
  styleUrls: ['./current-weather-list-item.component.css'],
})
export class CurrentWeatherListItemComponent implements OnInit {
  @Input() weatherInfo!: WeatherInfo;

  constructor() {}

  ngOnInit(): void {}
}
