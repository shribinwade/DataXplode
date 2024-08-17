import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SkuService } from '../../../../../Services/sku.service';
import { HttpClient } from '@angular/common/http';

import { SnackbarService } from '../../../../../Services/snackbar.service';

import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs'; 
import { switchMap, catchError } from 'rxjs/operators';
import { MiDataService } from '../../../mi-service/mi-data.service';
import { LoadingService } from '../../../../../Services/loading.service';
@Component({
  selector: 'app-sku-search-card',
  templateUrl: './sku-search-card.component.html',
  styleUrl: './sku-search-card.component.scss'
})
export class SkuSearchCardComponent implements OnInit {
 
 
  SearchProductForm:any =FormGroup;
  responseMessage:any;
  ReceviedData:any;
  ReceviedReviewData:any;
  productId!: string | null;
  productSiteName!: string | null;
  private subscription!: Subscription;
 
  constructor(
    private skuservice:SkuService ,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private sharedService:MiDataService,
    public loadingService:LoadingService,
    private elementRef: ElementRef
  ){}


  @Output() dataReceived: EventEmitter<any> = new EventEmitter<any>();
  @Output() ReviewData: EventEmitter<any> = new EventEmitter<any>();
  
  
  ngOnInit(): void {
    this.SearchProductForm = this.formBuilder.group({
      search:['']
    });

    this.productId=this.activatedRoute.snapshot.paramMap.get('id');
    this.productSiteName=this.activatedRoute.snapshot.paramMap.get('name');

    this.subscription = this.sharedService.handleSubmit.subscribe(searchValue =>{
      this.handleskuSubmit();
    })  
  }
 
  

  handleskuSubmit(): void {
    debugger
    

    const data=this.sharedService.getSearchData();

    
    if(data!=undefined){

         this.loadingService.setParentState(true);  

         // this.ngxService.start();
         
         const formData = this.SearchProductForm.value;
         // const data: String = formData.search;
       
         console.log('Search Query:', data);
       
         this.skuservice.Post_get_amazon_info_details(data).pipe(
          catchError((error:any) => {
            // this.ngxService.stop();
            this.loadingService.setParentState(false);
            console.log('Error:', error);
            if (error.error.message) {
             this.loadingService.setParentState(false);
              this.responseMessage = error.error.message;
            }
            // Return an empty observable to terminate the chain
            return of(null);
          })
         ).subscribe(detailsResponse =>{
             this.loadingService.setParentState(false);
             // Handle details response
             this.ReceviedData = detailsResponse;
             this.dataReceived.emit(this.ReceviedData);
             console.log('Details Response:', detailsResponse);
       
             // Return the next observable for reviews response
           
           },
           (error) => {
            // This block will only execute if catchError is used
            this.loadingService.setParentState(false);
            console.error('Error handler:', error);
          }
          )
       
         
    
    }else{
      this.loadingService.setParentState(false);
    }

    }
    ngOnDestroy() { 
      this.subscription.unsubscribe();
      this.elementRef.nativeElement.remove();
      console.log("Destroyed");
    }
  
}
