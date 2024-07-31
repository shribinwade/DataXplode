import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiWebComponent } from './ai-web.component';

describe('AiWebComponent', () => {
  let component: AiWebComponent;
  let fixture: ComponentFixture<AiWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiWebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
