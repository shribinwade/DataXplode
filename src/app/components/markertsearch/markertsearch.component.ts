import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ECommerceSitesService } from '../../e-commerce-sites.service';
import { MarketsearchService } from '../../Services/marketsearch.service';
import { DataServiceService } from './shared-service/data-service.service';
import { LoadingService } from '../../Services/loading.service';
import { finalize, Subscription } from 'rxjs';
import { MiDataService } from '../tools/mi-service/mi-data.service';

export interface marketSearch {
  Brand_list:BrandList;
  definition:any;
  market_trend:any;

}

export interface BrandList{
  Brand:string,
  Company:string,
  Segment: string,
  market_share: string,
  Market_Growth_Rate: string,
  bcg_value: string
}


@Component({
  selector: 'app-markertsearch',
  templateUrl: './markertsearch.component.html',
  styleUrl: './markertsearch.component.scss'
})
export class MarkertsearchComponent implements OnInit{

 
  
  productSiteName!: any;
  siteImgSrc!: string;

  marketSearchForm:any =FormGroup;
  searchData!: marketSearch ;
  isLoading!: boolean;

  private subscription!: Subscription;

  constructor(
              private formBuilder:FormBuilder,
              private activatedRoute: ActivatedRoute, 
              private ecommarcesites: ECommerceSitesService, 
              private marketService:MarketsearchService,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataServiceService,
              public loadingService:LoadingService,
              private sharedService:MiDataService,
              private elementRef: ElementRef

            ){

  }
  ngOnInit(): void {
    this.loadingService.isParentLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.productSiteName = this.activatedRoute.snapshot.paramMap.get('name');
    this.siteImgSrc = this.getImgSrc(this.ecommarcesites, this.productSiteName);
    this.marketSearchForm = this.formBuilder.group({
      search:['']
    });

    this.subscription = this.sharedService.handleSubmit.subscribe(searchValue =>{
      this.handleSubmit();
    })
  }

  ngOnDestroy() { 
    this.subscription.unsubscribe();
    this.elementRef.nativeElement.remove();
    console.log("Destroyed");
  }

  //
  handleSubmit() {
   
    const data=this.sharedService.getSearchData();
    console.log(data);
   
    if(data!=undefined){
      console.log("oninit method");
      console.log("submit data method");
   
      this.loadingService.setParentState(true);
    
      const formdata = this.marketSearchForm.value;
      console.log(formdata);
      
      // const data: string = formdata.search;
      // console.log('Search Query:', data);
  
      this.marketService.Post_search_brand_details(data).pipe(
        finalize(() => {
          this.loadingService.setParentState(false);
        })
      ).subscribe(res => {
        this.loadingService.setParentState(false);
         this.searchData = res;
         console.log(this.searchData);
  
         //search data in the shared service
         this.dataService.setSearchData(this.searchData);
  
         // Navigate to SearchResultComponent
         this.router.navigate([{ outlets: { content: ['search-result'] } }], { relativeTo: this.route });
        },
        error => {
          console.error('Error fetching search results:', error);
          // Handle error here if needed
        });
      

    }

 
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

}
