import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuSearchCardComponent } from './sku-search-card.component';

describe('SkuSearchCardComponent', () => {
  let component: SkuSearchCardComponent;
  let fixture: ComponentFixture<SkuSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkuSearchCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkuSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
