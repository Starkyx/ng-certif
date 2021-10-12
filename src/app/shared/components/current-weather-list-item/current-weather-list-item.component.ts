import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherInfo } from 'src/app/core/models/weather-info';

@Component({
  selector: 'app-current-weather-list-item',
  templateUrl: './current-weather-list-item.component.html',
  styleUrls: ['./current-weather-list-item.component.css'],
})
export class CurrentWeatherListItemComponent implements OnInit {
  @Input() weatherInfo!: WeatherInfo;
  @Output() deleteEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onClickDelete(zipCode: string): void {
    this.deleteEvent.emit(zipCode);
  }
}
