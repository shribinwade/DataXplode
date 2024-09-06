import { Component } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { NewsDataService } from '../../shared-service/news-data.service';
export interface brandResult{
  news:any;
}
@Component({
  selector: 'app-market-news',
  templateUrl: './market-news.component.html',
  styleUrl: './market-news.component.scss'
})
export class MarketNewsComponent {

  resultData!:brandResult;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['index', 'title', 'descr'];
  constructor(
    private newsDataService: NewsDataService,
  ){
     this.resultData = newsDataService.getSearchData();
  

  }
  ngOnInit(): void {
    
    this.dataSource = new MatTableDataSource<brandResult>(this.resultData.news);
  }
}
