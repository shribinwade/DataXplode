import { Component, OnInit } from '@angular/core';
import { NewsDataService } from '../../../shared-service/news-data.service';
import { MatTableDataSource } from '@angular/material/table';

export interface brandResult{
  Search_result:any;
}

@Component({
  selector: 'app-news-result',
  templateUrl: './news-result.component.html',
  styleUrl: './news-result.component.scss'
})
export class NewsResultComponent implements OnInit{

  resultData!:brandResult;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['index', 'title', 'descr'];
  constructor(
    private newsDataService: NewsDataService,
  ){
     this.resultData = newsDataService.getSearchData();
   

  }
  ngOnInit(): void {
    
    this.dataSource = new MatTableDataSource<brandResult>(this.resultData.Search_result);
  }

}
