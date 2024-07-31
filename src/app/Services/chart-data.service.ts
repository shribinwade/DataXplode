import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor() { }

  getChartData(): Observable<any[]> {
    // Replace this with your actual data retrieval logic
    const data = [
      {
        perception: 'Product_Features',
        positive_reviews: { count: 1, percentage: 29.17 },
        negative_reviews: { count: 16, percentage: 66.67 },
        neutral_reviews: { count: 1, percentage: 4.17 }
      },
      {
        perception: 'Functionality',
        positive_reviews: { count: 33, percentage: 40.74 },
        negative_reviews: { count: 31, percentage: 38.27 },
        neutral_reviews: { count: 17, percentage: 20.99 }
      },
      {
        perception: 'Personal_Harm',
        positive_reviews: { count: 65, percentage: 57.52 },
        negative_reviews: { count: 34, percentage: 30.09 },
        neutral_reviews: { count: 14, percentage: 12.39 }
      },
      {
        perception: 'Packaging',
        positive_reviews: { count: 2, percentage: 7.14 },
        negative_reviews: { count: 17, percentage: 60.71 },
        neutral_reviews: { count: 9, percentage: 32.14 }
      },
      {
        perception: 'Platform_Experience',
        positive_reviews: { count: 21, percentage: 87.5 },
        negative_reviews: { count: 3, percentage: 12.5 },
        neutral_reviews: { count: 0, percentage: 0 }
      },
      {
        perception: 'Brand_Perception',
        positive_reviews: { count: 4, percentage: 23.53 },
        negative_reviews: { count: 4, percentage: 23.53 },
        neutral_reviews: { count: 9, percentage: 52.94 }
      }
    ];

    return of(data); // This simulates an observable that returns data
  }
}
