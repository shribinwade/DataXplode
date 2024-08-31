import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorterStrategyComponent } from './porter-strategy.component';

describe('PorterStrategyComponent', () => {
  let component: PorterStrategyComponent;
  let fixture: ComponentFixture<PorterStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PorterStrategyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorterStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
