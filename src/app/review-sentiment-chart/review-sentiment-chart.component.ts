import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { ChartDataService } from '../Services/chart-data.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-review-sentiment-chart',
  templateUrl: './review-sentiment-chart.component.html',
  styleUrl: './review-sentiment-chart.component.scss'
})
export class ReviewSentimentChartComponent {

  @ViewChild('barChart') barChartRef!: ElementRef;

  constructor(private chartDataService: ChartDataService) {
    Chart.register(...registerables,ChartDataLabels);
  }

  ngAfterViewInit(): void {
    this.chartDataService.getChartData().subscribe(data => {
      this.createChart(data);
    });
  }

  createChart(data: any[]): void {
    const labels = data.map(item => item.perception);
    const positiveReviews = data.map(item => item.positive_reviews.percentage);
    const negativeReviews = data.map(item => item.negative_reviews.percentage);
    const neutralReviews = data.map(item => item.neutral_reviews.percentage);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Positive Reviews',
          data: positiveReviews,
          backgroundColor: 'rgba(0, 255, 0, 0.3)'
        },
        {
          label: 'Negative Reviews',
          data: negativeReviews,
          backgroundColor: 'rgba(255, 0, 0, 0.3)'
        },
        {
          label: 'Neutral Reviews',
          data: neutralReviews,
          backgroundColor: 'rgba(0, 0, 255, 0.3)'
        }
      ]
    };

    const options: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true, stacked: true },
        y: { beginAtZero: true, stacked: true }
      },
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.raw;
              return `${label}: ${value}%`;
            }
            
          }
        },
        datalabels: {
          
          display: true,
          formatter: (value: number) => `${value}%`,
          anchor: 'center',
          align: 'center',
          font:{
            size: 8
          }
        }
       
      },
  
    };

    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: chartData,
      options: options
    };

    new Chart(this.barChartRef.nativeElement, config);
  }
 
  
}
