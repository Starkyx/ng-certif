import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(`./modules/current-weather/current-weather.module`).then(
        (m) => m.CurrentWeatherModule
      ),
  },
  {
    path: 'forecast',
    loadChildren: () =>
      import(`./modules/forecast/forecast.module`).then(
        (m) => m.ForecastModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
