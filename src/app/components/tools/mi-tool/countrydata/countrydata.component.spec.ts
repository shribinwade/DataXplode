import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrydataComponent } from './countrydata.component';

describe('CountrydataComponent', () => {
  let component: CountrydataComponent;
  let fixture: ComponentFixture<CountrydataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountrydataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
