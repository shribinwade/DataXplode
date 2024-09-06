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
  selector: 'app-competitor-rivals',
  templateUrl: './competitor-rivals.component.html',
  styleUrl: './competitor-rivals.component.scss'
})


export class CompetitorRivalsComponent implements OnInit{

  CompetitorRivalData!: CompetitorRivial[];
  
  IndustryGrowth!:CompetitorRivial;

  FixedCost!:CompetitorRivial;
  FixedCostValue:string | undefined;

  ExitBarriers?:CompetitorRivial;
  ExitBarriersData:string[] | undefined;


  constructor(private sharedPorterService:SharedPorterStratergyService){}
  
  ngOnInit(): void {
   const allData:Root= this.sharedPorterService.getSearchData();
   //Getting Competitor data
   this.CompetitorRivalData = allData.competitor_rivials;

   this.IndustryGrowth = this.CompetitorRivalData[0];
   this.FixedCost = this.CompetitorRivalData[1];
   this.FixedCostValue = this.FixedCost.Fixed_Cost;

   this.ExitBarriers = this.CompetitorRivalData[2];

   this.ExitBarriersData = this.ExitBarriers.Exit_Barriers;
   

  }

  get formattedExitBarriers(): string | undefined {
    return this.ExitBarriersData?.join('\n\n');
  }

}
