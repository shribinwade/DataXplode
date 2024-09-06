import { Component, OnInit } from '@angular/core';
import { SharedPorterStratergyService } from '../../porter-strategy-service/shared-service-porter-stratergy.service';


export interface Root {
  competitor_rivials: CompetitorRivial[]
  portential_entrant: string[]
  Buyer_power: BuyerPower[]
}

export interface CompetitorRivial {
  Industry_Growth?: string
  definition: string
  Fixed_Cost?: string
  Exit_Barriers?: string[]
}

export interface BuyerPower {
  switch_Cost?: string
  definition: string
  price_sensitivity?: string
  purchase_size?: string[]
}


@Component({
  selector: 'app-customer-power',
  templateUrl: './customer-power.component.html',
  styleUrl: './customer-power.component.scss'
})
export class CustomerPowerComponent implements OnInit{

  ConsumerPowerData!: BuyerPower[];

  switchCost!:BuyerPower;

  priceSensitivity!:BuyerPower;
  // FixedCostValue:string | undefined;

  purchaseSize?:BuyerPower;
  purchaseSizeData:string[] | undefined;


  constructor(private sharedPorterService:SharedPorterStratergyService){}


  ngOnInit(): void {
    const allData:Root= this.sharedPorterService.getSearchData();

    
   //Getting Buyers data
   this.ConsumerPowerData = allData.Buyer_power;

   this.switchCost = this.ConsumerPowerData[0];
   this.priceSensitivity = this.ConsumerPowerData[1];
 

   this.purchaseSize = this.ConsumerPowerData[2];

   this.purchaseSizeData = this.purchaseSize.purchase_size;

  }

  get formattedpurchaseSizeData(): string | undefined {
    return this.purchaseSizeData?.join('\n\n');
  }
}
