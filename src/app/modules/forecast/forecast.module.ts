import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  declarations: [ForecastComponent],
  imports: [CommonModule, ForecastRoutingModule, SharedModule],
})
export class ForecastModule {}
