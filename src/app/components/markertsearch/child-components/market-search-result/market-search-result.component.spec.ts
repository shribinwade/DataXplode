import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSearchResultComponent } from './market-search-result.component';

describe('MarketSearchResultComponent', () => {
  let component: MarketSearchResultComponent;
  let fixture: ComponentFixture<MarketSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketSearchResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
