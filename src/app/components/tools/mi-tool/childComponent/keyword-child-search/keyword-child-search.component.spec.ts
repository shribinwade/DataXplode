import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordChildSearchComponent } from './keyword-child-search.component';

describe('KeywordChildSearchComponent', () => {
  let component: KeywordChildSearchComponent;
  let fixture: ComponentFixture<KeywordChildSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeywordChildSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordChildSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
