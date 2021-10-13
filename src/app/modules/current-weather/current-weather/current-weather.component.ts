import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WeatherInfo } from 'src/app/core/models/weather-info';
import { WeatherService } from 'src/app/core/services/weather.service';
import { capitalize } from 'src/app/core/utils/utils';

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

  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeatherAllLocations().subscribe(
      (currentWeatherList) => {
        this.currentWeatherList = currentWeatherList;
      },
      (error) => {
        this.toastr.success(error.error.message, 'Error');
      }
    );
  }

  submit(): void {
    const isNewZipCode: boolean =
      this.currentWeatherList.findIndex(
        (weatherInfo) => weatherInfo.zipCode === this.zipCode.value
      ) === -1;

    if (isNewZipCode) {
      this.weatherService.saveZipCode(this.zipCode.value).subscribe(
        (weatherInfo) => {
          this.currentWeatherList.push(weatherInfo);
        },
        (error) => {
          this.toastr.error(capitalize(error.error.message), 'Error');
        }
      );
    }

    this.zipCode.setValue('');
  }

  deleteItem(zipCode: string) {
    this.weatherService.deleteZipCode(zipCode);
    this.currentWeatherList = this.currentWeatherList.filter(
      (item: WeatherInfo) => item.zipCode !== zipCode
    );
  }
}
