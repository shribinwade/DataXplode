import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorterSearchComponent } from './porter-search.component';

describe('PorterSearchComponent', () => {
  let component: PorterSearchComponent;
  let fixture: ComponentFixture<PorterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PorterSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
