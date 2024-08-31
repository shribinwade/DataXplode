import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorStratergyComponent } from './competitor-stratergy.component';

describe('CompetitorStratergyComponent', () => {
  let component: CompetitorStratergyComponent;
  let fixture: ComponentFixture<CompetitorStratergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitorStratergyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorStratergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
