import { Component } from '@angular/core';
import { DataServiceService } from '../../shared-service/data-service.service';
import { LoadingService } from '../../../../Services/loading.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketsearchService } from '../../../../Services/marketsearch.service';
import { NewsDataService } from '../../shared-service/news-data.service';
import { finalize } from 'rxjs';

export interface marketSearch {
  Brand_list: any;
  definition: any;
  market_cagr: string;
  market_trend_list: any;
}

// export interface marketTread{
//   title:string;
//   url:string;
//   descr:string;
// }

@Component({
  selector: 'app-market-search-result',
  templateUrl: './market-search-result.component.html',
  styleUrl: './market-search-result.component.scss',
})
export class MarketSearchResultComponent {
  
  hiddendata: boolean = true;
  searchData!: marketSearch;
  newsSearchData: any;
  dataSource = new MatTableDataSource<marketSearch>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['index', 'select', 'title', 'descr'];
  ColumnsHeaders: string[] = [];
  dataSourceData: any = [];
  
  brandSearchForm: any = FormGroup;


  constructor(
    private dataService: DataServiceService,
    private newsDataService: NewsDataService,
    public loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private marketService:MarketsearchService,
  ) {}

  ngOnInit(): void {

    this.brandSearchForm = this.formBuilder.group({
      search:['']
    });


    this.searchData = this.dataService.getSearchData();
    if (this.searchData) {
      this.hiddendata = !true;
    }
    this.dataSourceData = this.searchData.market_trend_list.map((data: any) => {
      return data;
    });
    this.dataSource = new MatTableDataSource<marketSearch>(this.dataSourceData);
  }

  handleSubmit() {
    this.loadingService.setChildState(true);

    const formdata = this.brandSearchForm.value;
    console.log(formdata);
    
    const data: string = formdata.search;
    console.log('Search Query:', data);
    
    this.marketService.Post_search_brand_details_and_news(data).pipe(
      finalize(() => {
        this.loadingService.setChildState(false);
      })
    ).subscribe(res => {
      this.newsSearchData = res;
      console.log(this.newsSearchData);
  
      // Save search data in the shared service
      this.newsDataService.setSearchData(this.newsSearchData);
  
      // Navigate to SearchResultComponent
      this.router.navigate([{ outlets: { searchnews: ['search-result'] } }], { relativeTo: this.route });
    }, error => {
      console.error('Error fetching search results:', error);
      // Handle error here if needed
    });

   
    
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
