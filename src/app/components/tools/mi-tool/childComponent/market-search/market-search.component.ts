import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MiDataService } from '../../../mi-service/mi-data.service';

@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrl: './market-search.component.scss'
})
export class MarketSearchComponent implements OnInit {

  marketsearchform:any =FormGroup;

  constructor(private formBuilder:FormBuilder,
    private route: ActivatedRoute, 
    private router: Router,
    private sharedService:MiDataService,
    private elementRef: ElementRef){

    }
  ngOnInit(): void {
    this.marketsearchform = this.formBuilder.group({
      search:['']
    });
    this.router.navigate(['market-search-child'] , { relativeTo: this.route });
  }

  

  marketSubmit(){
  
    const formdata = this.marketsearchform.value;
 
    const value:string =formdata.search;

    this.sharedService.setSearchData(value);
  
    this.sharedService.triggerHandleSubmit();

  }



}
