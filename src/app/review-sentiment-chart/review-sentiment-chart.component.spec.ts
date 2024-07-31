import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSentimentChartComponent } from './review-sentiment-chart.component';

describe('ReviewSentimentChartComponent', () => {
  let component: ReviewSentimentChartComponent;
  let fixture: ComponentFixture<ReviewSentimentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewSentimentChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSentimentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
