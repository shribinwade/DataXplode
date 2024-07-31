import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOptimizationComponent } from './price-optimization.component';

describe('PriceOptimizationComponent', () => {
  let component: PriceOptimizationComponent;
  let fixture: ComponentFixture<PriceOptimizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceOptimizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceOptimizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
