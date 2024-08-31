import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDistributorComponent } from './search-distributor.component';

describe('SearchDistributorComponent', () => {
  let component: SearchDistributorComponent;
  let fixture: ComponentFixture<SearchDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchDistributorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
