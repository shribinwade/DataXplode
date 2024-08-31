import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ECommerceSitesService } from '../../e-commerce-sites.service';
import { MarketsearchService } from '../../Services/marketsearch.service';
import { DataServiceService } from './shared-service/data-service.service';
import { LoadingService } from '../../Services/loading.service';
import { filter, finalize, Subscription } from 'rxjs';
import { MiDataService } from '../tools/mi-service/mi-data.service';
import { fadeInOutAnimation } from '../../shared/animations';
import { SnackbarService } from '../../Services/snackbar.service';

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
  styleUrl: './markertsearch.component.scss',
  animations: [fadeInOutAnimation]
})
export class MarkertsearchComponent implements OnInit{


  productSiteName!: any;
  siteImgSrc!: string;

  marketSearchForm: FormGroup = this.formBuilder.group({
    search: ['']
  });

  searchData!: any;
  isLoading!: boolean;
  private subscription: Subscription = new Subscription();
  private navigatedAway: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private ecommarcesites: ECommerceSitesService, 
    private marketService: MarketsearchService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
    public loadingService: LoadingService,
    private sharedService: MiDataService,
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private globalSnackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.productSiteName = this.activatedRoute.snapshot.paramMap.get('name');
    this.siteImgSrc = this.getImgSrc(this.ecommarcesites, this.productSiteName);

    this.subscription.add(
      this.loadingService.isParentLoading.subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
      })
    );

    this.subscription.add(
      this.sharedService.handleSubmit.subscribe(() => {
        this.handleSubmit();
      })
    );

    this.subscription.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
      ).subscribe(event => {
        if (event instanceof NavigationStart) {
          this.navigatedAway = true;
        }
        if (event instanceof NavigationEnd) {
          this.navigatedAway = false;  // Reset if navigation ended back to this component
        }
      })
    );

  }

  ngOnDestroy() { 
    this.subscription.unsubscribe();
    this.elementRef.nativeElement.remove();
  }

  handleSubmit() {
    const data = this.sharedService.getSearchData();
    // const snackBarRef = this.globalSnackbar.showSuccess('Market Search Completed', 'View Result');
    if (data) {
      this.loadingService.setParentState(true);
  
      this.marketService.Post_search_brand_details(data).pipe(
        finalize(() => {
        
          this.loadingService.setParentState(false);
        })
      ).subscribe(res => {
        this.searchData = res;
        this.dataService.setSearchData(this.searchData);
  
        if (this.navigatedAway) {
          const snackBarRef = this.globalSnackbar.showSuccess('Market Search Completed', 'View Result');
  
          snackBarRef.onAction().subscribe(() => { 
            this.router.navigate([{ outlets: { content: ['search-result'] } }], { relativeTo: this.route });
          });
          
        } else {
          this.router.navigate([{ outlets: { content: ['search-result'] } }], { relativeTo: this.route });
        }
      }, error => {
        console.error('Error fetching search results:', error);
        const snackBarRef = this.globalSnackbar.showError('Something went Wrong', 'Close');
      });
    }
  }

  getImgSrc(ecommarcesites: ECommerceSitesService, productSiteName: any) {
    for (let site of ecommarcesites.eCommerceSites) {
      for (let sites of site.sites) {
        if (sites.name === productSiteName) {
          return sites.src;
        }
      }
    }
    return 'null';
  }

 
  
  // productSiteName!: any;
  // siteImgSrc!: string;

  // marketSearchForm:any =FormGroup;
  // searchData!: marketSearch ;
  // isLoading!: boolean;

  // private subscription!: Subscription;

  // private navigatedAway: boolean = false;

  // constructor(
  //             private formBuilder:FormBuilder,
  //             private activatedRoute: ActivatedRoute, 
  //             private ecommarcesites: ECommerceSitesService, 
  //             private marketService:MarketsearchService,
  //             private router: Router,
  //             private route: ActivatedRoute,
  //             private dataService: DataServiceService,
  //             public loadingService:LoadingService,
  //             private sharedService:MiDataService,
  //             private elementRef: ElementRef,
  //             private cdRef: ChangeDetectorRef,
  //             private globalSnackbar: SnackbarService

  //           ){

  // }
  // ngOnInit(): void {

  //   this.loadingService.isParentLoading.subscribe((isLoading: boolean) => {
  //     this.isLoading = isLoading;
  //   });

  //   this.productSiteName = this.activatedRoute.snapshot.paramMap.get('name');
  //   this.siteImgSrc = this.getImgSrc(this.ecommarcesites, this.productSiteName);
    
  //   this.marketSearchForm = this.formBuilder.group({
  //     search:['']
  //   });

  //   this.subscription = this.sharedService.handleSubmit.subscribe(searchValue =>{
  //     this.handleSubmit();
  //   })

  //    // Listen for router events to detect if the user navigates away
  //    this.subscription = this.router.events.pipe(
  //     filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
  //    ).subscribe(event => {
  //     if (event instanceof NavigationStart) {
       
        
  //       this.navigatedAway = true;
  //       console.log(`navigation start ${this.navigatedAway}`);
  //     }
  //     if (event instanceof NavigationEnd) {
    
        
  //       this.navigatedAway = false;  // Reset if navigation ended back to this component
  //       console.log(`navigation end ${this.navigatedAway}`);
  //     }

  //   });


  // }

  // ngOnDestroy() { 
  //   this.subscription.unsubscribe();
  //   this.elementRef.nativeElement.remove();
  //   console.log("Destroyed");
  // }

  // //
  // handleSubmit() {
   
  //   const data=this.sharedService.getSearchData();
  //   console.log(data);
   
  //   if(data){
 
  //     this.loadingService.setParentState(true);
    
  //     const formdata = this.marketSearchForm.value;
  
  //     this.marketService.Post_search_brand_details(data).pipe(
  //       finalize(() => {
  //         this.loadingService.setParentState(false);
  //       })
  //     ).subscribe(res => {
         
  //        this.searchData = res;
  //      //search data in the shared service
  //        this.dataService.setSearchData(this.searchData);

  
       
  //       //  // Navigate to SearchResultComponent
  //       //  this.router.navigate([{ outlets: { content: ['search-result'] } }], { relativeTo: this.route });
        
  //       // },
  //       // error => {
  //       //   console.error('Error fetching search results:', error);
  //       //   // Handle error here if needed
  //       // }

  //       // If user navigated away, show Snackbar
  //     if (this.navigatedAway) {
  //       const snackBarRef = this.globalSnackbar.showSuccess('Market Search Completed', 'View Result');

  //       snackBarRef.onAction().subscribe(() => {
         
  //         //search data in the shared service
  //         this.dataService.setSearchData(this.searchData);
  //         this.router.navigate([{ outlets: { content: ['search-result'] } }], { relativeTo: this.route });
          
  //       });
  //     } else {
  //       // If user stays in the same component, navigate directly
  //       //search data in the shared service
  //       this.dataService.setSearchData(this.searchData);
  //       this.router.navigate([{ outlets: { content: ['search-result'] } }], { relativeTo: this.route });
  //     }

  //   }, error => {
  //     console.error('Error fetching search results:', error);
  //     // Handle error here if needed
  //   });
      
  // }

 
  // }

  // // popnotification():void{
  // //   const snackBarRef = this.globalSnackbar.showSuccess('Search Successful','view Result') ;
  // // }

  
  //  //getting site img header 
  //  getImgSrc(ecommarcesites: ECommerceSitesService, productSiteName: any) {
  //   let imgsrc!: String;
  //   for (let site of ecommarcesites.eCommerceSites) {
  //     for (let sites of site.sites) {
  //       if (sites.name == productSiteName) {
  //         return sites.src;
  //       }
  //     }
  //   }
  //   return 'null';
  // }

}
