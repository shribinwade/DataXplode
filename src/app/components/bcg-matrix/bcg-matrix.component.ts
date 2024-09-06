import { Component, ElementRef } from '@angular/core';
import { DataServiceService } from '../markertsearch/shared-service/data-service.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketLeaderComponent } from '../markertsearch/child-components/market-leader/market-leader.component';
import { Subscription } from 'rxjs';

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

  brands!:brandList;

  private subscription!: Subscription;

  constructor( private dataService:DataServiceService, private ref:MatDialogRef<BcgMatrixComponent>, private elementRef: ElementRef ){

    
    this.subscription = this.dataService.getSearchData().subscribe(data => {
      this.brands = data;
      // The view will automatically update when `searchData` changes
    });
  }

   closepopup(){
    this.ref.close()
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Clean up subscription to avoid memory leaks
    }
    this.elementRef.nativeElement.remove();
   
  }




}
