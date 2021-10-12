import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherListItemComponent } from './current-weather-list-item.component';

describe('CurrentWeatherListItemComponent', () => {
  let component: CurrentWeatherListItemComponent;
  let fixture: ComponentFixture<CurrentWeatherListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
