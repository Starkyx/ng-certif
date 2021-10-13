import { Component, Input, OnInit } from '@angular/core';
import { ForecastInfo } from 'src/app/core/models/forecast-info';

@Component({
  selector: 'app-forecast-weather-list-item',
  templateUrl: './forecast-weather-list-item.component.html',
  styleUrls: ['./forecast-weather-list-item.component.css'],
})
export class ForecastWeatherListItemComponent implements OnInit {
  @Input() forecastInfo: ForecastInfo = <ForecastInfo>{};

  constructor() {}

  ngOnInit(): void {}
}
