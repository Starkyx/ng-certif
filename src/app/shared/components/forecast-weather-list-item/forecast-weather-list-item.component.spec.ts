import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastWeatherListItemComponent } from './forecast-weather-list-item.component';

describe('ForecastWeatherListItemComponent', () => {
  let component: ForecastWeatherListItemComponent;
  let fixture: ComponentFixture<ForecastWeatherListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastWeatherListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastWeatherListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
