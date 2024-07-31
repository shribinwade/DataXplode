import { Component } from '@angular/core';
import { DataServiceService } from '../markertsearch/shared-service/data-service.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketLeaderComponent } from '../markertsearch/child-components/market-leader/market-leader.component';

export interface brandList {
  Brand_list:brands[];

}

export interface brands{
  Brand:string;
  Company:string;
  Segment:string;
  market_share:string;
  Market_Growth_Rate:string;
  bcg_value:string;
}
@Component({
  selector: 'app-bcg-matrix',
  templateUrl: './bcg-matrix.component.html',
  styleUrl: './bcg-matrix.component.scss'
})
export class BcgMatrixComponent {

  brands:brandList;

  constructor( private dataService:DataServiceService, private ref:MatDialogRef<BcgMatrixComponent> ){

    this.brands = this.dataService.getSearchData();

   this.test()
     
  }

   test() {
    if (this.brands && this.brands.Brand_list) {
      console.log(this.brands.Brand_list);
    } else {
      console.error('Brand_list is undefined');
    }
  }

   closepopup(){
    this.ref.close()
  }




}
