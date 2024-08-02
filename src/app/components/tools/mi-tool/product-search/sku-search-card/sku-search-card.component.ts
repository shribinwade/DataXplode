import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SkuService } from '../../../../../Services/sku.service';
import { HttpClient } from '@angular/common/http';

import { SnackbarService } from '../../../../../Services/snackbar.service';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; 
import { switchMap, catchError } from 'rxjs/operators';
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
 
  constructor(
    private skuservice:SkuService ,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute
  ){}


  @Output() dataReceived: EventEmitter<any> = new EventEmitter<any>();
  @Output() ReviewData: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnInit(): void {
    this.SearchProductForm = this.formBuilder.group({
      search:['']
    });

    this.productId=this.activatedRoute.snapshot.paramMap.get('id');
    this.productSiteName=this.activatedRoute.snapshot.paramMap.get('name');
    
   
    }

    handleSubmit(): void {
      // this.ngxService.start();
      const formData = this.SearchProductForm.value;
      const data: String = formData.search;
    
      console.log('Search Query:', data);
    

      this.skuservice.Post_get_amazon_info_details(data).pipe(
        switchMap((detailsResponse:any) => {
          // Handle details response
          this.ReceviedData = detailsResponse;
          this.dataReceived.emit(this.ReceviedData);
          console.log('Details Response:', detailsResponse);
    
          // Return the next observable for reviews response
          return this.skuservice.Post_get_amazon_info_reviews(data);
        }),
        catchError((error:any) => {
          // this.ngxService.stop();
          console.log('Error:', error);
          if (error.error.message) {
            this.responseMessage = error.error.message;
          }
          // Return an empty observable to terminate the chain
          return of(null);
        })
      ).subscribe(reviewsResponse => {
        if (reviewsResponse) {
          // Handle reviews response
          this.ReceviedReviewData = reviewsResponse;
          this.ReviewData.emit(this.ReceviedReviewData);
          console.log('Reviews Response:', reviewsResponse);
        }
        // this.ngxService.stop();
      });


    }
  
}
