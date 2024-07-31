import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompititorAnalyzerComponent } from './compititor-analyzer.component';

describe('CompititorAnalyzerComponent', () => {
  let component: CompititorAnalyzerComponent;
  let fixture: ComponentFixture<CompititorAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompititorAnalyzerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompititorAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
