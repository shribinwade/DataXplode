import { Component, OnInit } from '@angular/core';
import { SharedPorterStratergyService } from '../../porter-strategy-service/shared-service-porter-stratergy.service';

export interface Root {

  portential_entrant:any
  
}
export interface newEntrants {
  difficulties: Difficulty[]
  opportunities: Opportunity[]
}

export interface Difficulty {
  point: string
  details: string[]
}

export interface Opportunity {
  point: string
  details: string[]
}

@Component({
  selector: 'app-new-entrants',
  templateUrl: './new-entrants.component.html',
  styleUrl: './new-entrants.component.scss'
})
export class NewEntrantsComponent implements OnInit {

 
  // Entrans!:newEntrants[];
  // Challenges!:Difficulty[];
  // Opportunity!: Opportunity[];


  // constructor(private sharedPorterService:SharedPorterStratergyService){

  // }
  // ngOnInit(): void {
  //   // const allData:Root= this.sharedPorterService.getSearchData();
  //   // console.log(allData);
    
  //   // const potential_entrant =  allData.portential_entrant;
  //   //   const data:any=potential_entrant;
  //   //   this.Entrans=  JSON.parse(data);
                 
  //   //   // this.Challenges = this.Entrans.difficulties;
  //   //   // console.log(this.Challenges);
  //   //   // this.Opportunity = this.Entrans.opportunities

    
  // }


  Entrans!: newEntrants[];
  Challenges!: Difficulty[];
  Opportunity!: Opportunity[];

  constructor(private sharedPorterService: SharedPorterStratergyService) {}

  ngOnInit(): void {
    const allData: Root = this.sharedPorterService.getSearchData();
    



    const dataen= allData.portential_entrant;

    const data:newEntrants = JSON.parse(dataen);
    this.Challenges = data.difficulties;
    this.Opportunity = data.opportunities;

    // this.Opportunity = this.Entrans.flatMap((entrant) => entrant.opportunities);
}
}
