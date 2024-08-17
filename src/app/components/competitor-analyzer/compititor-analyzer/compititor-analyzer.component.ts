import { Component, OnInit } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductMatrixService } from '../../../Services/product-matrix.service';
import { LoadingService } from '../../../Services/loading.service';
import { MatrixResultService } from '../shared-service/matrix-result.service';

export interface ProductMatrix{
  ASIN: string;
  Best_Sellers_Rank: string;
  Brand: string;
  Country_of_Origin_: string;
  Customer_Reviews: string;
  Date_First_Available_: string;
  Description: string;
  Generic_Name_: string;
  Image_url: string;
  Importer: string;
  Item_Dimensions_LxWxH_: string;
  Item_Weight_: string;
  Item_dimensions_L_x_W_x_H: string;
  Item_model_number_: string;
  MRP: string;
  Manufacturer: string;
  Net_Quantity_: string;
  Packer_: string;
  Product_Dimensions_: string;
  Product_url: string;
  Rating_count: string;
  Rating_value: string;
  SP: string;
  Scent: string;
  Skin_Type: string;
  avg_rating: string;
  position: string;
  product_name: string;
  rating_count: string;
  seller_name: string;
}


export interface Features {
  feature: string;
}
@Component({
  selector: 'app-compititor-analyzer',
  templateUrl: './compititor-analyzer.component.html',
  styleUrl: './compititor-analyzer.component.scss'
})
export class CompititorAnalyzerComponent implements OnInit {

  marketSearchForm:any =FormGroup;
  searchData: any[] = [];

  constructor(private formBuilder:FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private productmatrixService:ProductMatrixService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingService:LoadingService,
    public dataService:MatrixResultService

  ){}

  ngOnInit(): void {
   this.marketSearchForm = this.formBuilder.group({
    keyword:[''],
    product_name:[''],
    product_description:[''],
    brand:[''],
    features:[this.features]
   });
  }

  handleSubmit() {
  
    const formdata = this.marketSearchForm.value;
    console.log(formdata);
    console.log(typeof(formdata));
      // typeof(formdata);
    
    // const data: string = formdata.search;
 
    this.productmatrixService.Post_get_amazon_info_details(formdata).subscribe(res =>{
     
     console.log(res);
     
     this.searchData= res;
    // this.searchData = res;
     console.log(this.searchData);
    
     
     
      
      // this.searchData=res as ProductMatrix[];
      
      
      // Navigate to SearchResultComponent
     
           //     //search data in the shared service
       this.dataService.setSearchData(this.searchData);

       // Redirect to the target route
       this.router.navigate(['services/product-matrix-result']);
    })
      

        //     //search data in the shared service
        // this.dataService.setSearchData(this.searchData);
         
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  features: Features[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.features.push({feature: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(feature: Features): void {
    const index = this.features.indexOf(feature);

    if (index >= 0) {
      this.features.splice(index, 1);
    }
  }

  edit(feature: Features, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(feature);
      return;
    }

    // Edit existing feature
    const index = this.features.indexOf(feature);
    if (index >= 0) {
      this.features[index].feature = value;
    }
  }

 



}
