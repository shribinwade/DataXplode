import { Component, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogClose, MatDialogRef, } from '@angular/material/dialog';
interface Specification {
  Brand?: string;
  ItemForm?: string;
  ItemVolume?: string;
  Scent?: string;
  SpecialFeature?: string;
  ProductDimensions?: string;
  DateFirstAvailable?: string;
  Manufacturer?: string;
  ASIN_?: string;
  ItemModelNumber?: string;
  CountryOfOrigin?: string;
  Packer?: string;
  ItemWeight?: string;
  ItemDimensionsLxWxH?: string;
  NetQuantity?: string;
  IncludedComponents?: string;
  GenericName?: string;
  BestSellersRank?: string;
  CustomerReviews?: string;
}
@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrl: './specification.component.scss'
})
export class SpecificationComponent  {
    
    // product_feature_data!:data.product_features[];
    // specification: Specification = {}
    
    
      productFeatures: any;

      constructor(@Inject(MAT_DIALOG_DATA) public data:{product_features:any},private ref: MatDialogRef<SpecificationComponent>){
            console.log(data);
            this.productFeatures = this.data.product_features.map((feature:any) => this.removeUnderscores(feature));
           
       }

         
  removeUnderscores(obj: any): any {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/_/g, ' '); // Replace underscores with spaces in key
        newObj[newKey] = obj[key];
      }
    }
    return newObj;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }



      closepopup(){
        this.ref.close()
      }
}
