import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLogosComponent } from './top-logos.component';

describe('TopLogosComponent', () => {
  let component: TopLogosComponent;
  let fixture: ComponentFixture<TopLogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopLogosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopLogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
