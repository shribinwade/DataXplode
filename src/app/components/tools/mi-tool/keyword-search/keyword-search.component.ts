import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ECommerceSitesService } from '../../../../e-commerce-sites.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from '../../../../Services/loading.service';
import { KeywordService } from '../../../../Services/keyword.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../../../competitor-analyzer/result-component/matrix-result-component/Dialog/ReviewDialog/review-dialog/review-dialog.component';
import { ReviewSentimentChartComponent } from '../../../../review-sentiment-chart/review-sentiment-chart.component';

export interface keywordDetails {
  position:number;
  pdp_title_value: string;
  web_pid: string;
  price_sp: number;
  price_rp:number;
  pdp_discount_value:number;
  pdp_rating_value:number;
  pdp_rating_count:number;
  pdp_image_url:string;
  pdp_page_url: string;
  bought:string;
}

@Component({
  selector: 'app-keyword-search',
  templateUrl: './keyword-search.component.html',
  styleUrl: './keyword-search.component.scss'
})
export class KeywordSearchComponent implements OnInit,AfterViewInit {

  
  productData: keywordDetails[] = [];
  public pageSlice = this.productData.slice(0, 50);

  keywordSearchName!: string;
  //keywordSearchForm
  searchKeywordForm: any =FormGroup;
  searchProductForm: any = FormGroup;
  productSearchName!:string;
  dataSource = new MatTableDataSource<keywordDetails>(this.pageSlice);

  ratings: number[] = [4, 3, 2, 1];

  displayedColumns: string[] = ['index','pdp_title_value', 'pdp_image_url','web_pid', 
                                'price_rp','price_sp' , 'pdp_discount_value', 
                                'pdp_rating_value','pdp_rating_count'
                                 ,'bought','moreInfo'
                               ];
  productSiteName!: any;
  siteImgSrc!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
     private activatedRoute: ActivatedRoute, 
     private ecommarcesites: ECommerceSitesService,  
     private formBuilder:FormBuilder,
     public loadingService:LoadingService,
     private keyService:KeywordService,
     private dialog: MatDialog
  ){}
  
  ngOnInit(): void {
    this.productSiteName = this.activatedRoute.snapshot.paramMap.get('name');
    this.siteImgSrc = this.getImgSrc(this.ecommarcesites, this.productSiteName);
    this.searchKeywordForm = this.formBuilder.group({
      search:['']
    });
    this.searchProductForm = this.formBuilder.group({
      search:['']
    })
   
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  //handling submit 
  handleSubmit(){
    this.loadingService.setLoadingState(true);
    const formdata = this.searchKeywordForm.value;
    const data: string = formdata.search;
    console.log('Search Query:', data);
    this.keyService.Post_get_amazon_info_details(data).subscribe(res => {
      console.log(res);
      
      debugger
      this.loadingService.setLoadingState(false);
      this.productData = res.Amazon_keyword_data;
      this.keywordSearchName = data;
      this.pageSlice=this.productData.slice(0, 50);
      this.updatePageSlice();
    })
      
  }

  private updatePageSlice(): void {
    this.pageSlice = this.productData.slice(0, 50);
    this.dataSource.data = this.pageSlice;
  }

  onPageChange(event: PageEvent):void{
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = Math.min(startIndex + event.pageSize, this.productData.length);
    this.pageSlice = this.productData.slice(startIndex, endIndex);
    this.dataSource.data = this.pageSlice;
  }


  //getting site img header 
  getImgSrc(ecommarcesites: ECommerceSitesService, productSiteName: any) {
    let imgsrc!: String;
    for (let site of ecommarcesites.eCommerceSites) {
      for (let sites of site.sites) {
        if (sites.name == productSiteName) {
          return sites.src;
        }
      }
    }
    return 'null';
  }

  changeSortOrder(event: Event): void {
    debugger
      const selectElement = event.target as HTMLSelectElement;
      const sortOrder = selectElement.value as 'ratingHighToLow' | 'ratingLowToHigh' | 'priceHighToLow' | 'priceLowToHigh';
    
    switch (sortOrder) {
      
      case 'ratingLowToHigh':
        this.sort.active = 'pdp_rating_value';
        this.sort.direction = 'asc';
        break;
      case 'ratingHighToLow':
        this.sort.active = 'pdp_rating_value';
        this.sort.direction = 'desc';
        break;
      case 'priceLowToHigh':
        this.sort.active = 'price_sp';
        this.sort.direction = 'asc';
        break;  
      case 'priceHighToLow':
        this.sort.active = 'price_sp';
        this.sort.direction = 'desc';
        break;
    
      default:
        this.sort.active = '';
        this.sort.direction = '';
        break;
    }
    this.dataSource.sort = this.sort; // Reapply sorting with the new sortOrder
  
  }

  // SortByPrice(event: Event): void {
  //   debugger
  //     const selectElement = event.target as HTMLSelectElement;
  //     const sortOrder = selectElement.value as  'priceHighToLow' | 'priceLowToHigh';
    
  //   switch (sortOrder) {
      
  //     case 'priceLowToHigh':
  //       this.sort.active = 'price_sp';
  //       this.sort.direction = 'asc';
  //       break;  
  //     case 'priceHighToLow':
  //       this.sort.active = 'price_sp';
  //       this.sort.direction = 'desc';
  //       break;
    
  //     default:
  //       this.sort.active = '';
  //       this.sort.direction = '';
  //       break;
  //   }
  //   this.dataSource.sort = this.sort; // Reapply sorting with the new sortOrder
  
  // }

  applyFilter(event: Event) {
    debugger
    console.log(this.productSearchName);
    
    const selectElement = event.target as HTMLSelectElement;
    
    if (event !== undefined && event !== null) {
      const filterValue = parseFloat(selectElement.value.toString().trim());
  
      // Apply the filter predicate
      this.dataSource.filterPredicate = (data:keywordDetails , filter: string) => {
        console.log('data.rating:', data.pdp_rating_value);
        console.log('filter:', filter);
        const rating = data.pdp_rating_value; 
        if(filterValue === 4.0 ){
          if(this.productSearchName !== undefined && this.productSearchName !== null){
            console.log("rating include product searchname");
            
            return rating >= filterValue && data.pdp_title_value.toLowerCase().includes(this.productSearchName.toLowerCase()) && rating <= 5.0;
          }else{
            console.log("else value");
            
            return  rating >= filterValue && rating >= 4.0;
          }
         
        }
        if(filterValue === 3.0){
          if(this.productSearchName !== undefined && this.productSearchName !== null){
            console.log("rating include product searchname");
            
            return rating >= filterValue && data.pdp_title_value.toLowerCase().includes(this.productSearchName.toLowerCase()) && rating < 4.0;
          }else{
            console.log("else value");
            
            return  rating >= filterValue && rating < 4.0;
          }
         
        }
        if(filterValue === 2.0){
          if(this.productSearchName !== undefined && this.productSearchName !== null){
            console.log("rating include product searchname");
            
            return rating >= filterValue && data.pdp_title_value.toLowerCase().includes(this.productSearchName.toLowerCase()) && rating < 3.0;
          }else{
            console.log("else value");
            
            return  rating >= filterValue && rating < 3.0;
          }
         
        }
        if(filterValue === 1.0){
          if(this.productSearchName !== undefined && this.productSearchName !== null){
            console.log("rating include product searchname");
            
            return rating >= filterValue && data.pdp_title_value.toLowerCase().includes(this.productSearchName.toLowerCase()) && rating < 2.0;
          }else{
            console.log("else value");
            
            return  rating >= filterValue && rating < 2.0;
          }
        
        }
        else{
          return rating === rating;
        }
        
      };
  
      // Set the filter
      this.dataSource.filter = filterValue.toString();
  
      // Log the filtered data
      console.log('Filtered data:', this.dataSource.filteredData);
      // this.cdRef.detectChanges();
    }

  }

  productSearch() {
    debugger
    const filterValue = this.searchProductForm.get('search')?.value || '';
          this.productSearchName = filterValue;
    // Define the filter predicate dynamically
    this.dataSource.filterPredicate = (data: keywordDetails, filter: string): boolean => {
      return data.pdp_title_value.toLowerCase().includes(filter.trim().toLowerCase());
    };

    // Apply the filter
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openReviewDialog(asinData:string){
    debugger
    console.log(asinData);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    
    dialogConfig.panelClass = 'full-screen-dialog';
    dialogConfig.data = { asinData };
    this.dialog.open(ReviewDialogComponent, dialogConfig);
  }

  
  openReviewAnalysisDialog(){
    debugger
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    
    dialogConfig.panelClass = 'full-screen-dialog';
   
    this.dialog.open(ReviewSentimentChartComponent, dialogConfig);
  }
       
   

}
  



