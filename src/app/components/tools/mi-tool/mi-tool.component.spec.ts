import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiToolComponent } from './mi-tool.component';

describe('MiToolComponent', () => {
  let component: MiToolComponent;
  let fixture: ComponentFixture<MiToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
