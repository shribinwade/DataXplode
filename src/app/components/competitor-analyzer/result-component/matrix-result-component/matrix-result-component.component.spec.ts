import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixResultComponentComponent } from './matrix-result-component.component';

describe('MatrixResultComponentComponent', () => {
  let component: MatrixResultComponentComponent;
  let fixture: ComponentFixture<MatrixResultComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatrixResultComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixResultComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
