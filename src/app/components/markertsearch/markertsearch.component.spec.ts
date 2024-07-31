import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkertsearchComponent } from './markertsearch.component';

describe('MarkertsearchComponent', () => {
  let component: MarkertsearchComponent;
  let fixture: ComponentFixture<MarkertsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkertsearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkertsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
