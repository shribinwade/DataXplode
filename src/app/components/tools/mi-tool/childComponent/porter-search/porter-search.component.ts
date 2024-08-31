import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MiDataService } from '../../../mi-service/mi-data.service';

@Component({
  selector: 'app-porter-search',
  templateUrl: './porter-search.component.html',
  styleUrl: './porter-search.component.scss'
})
export class PorterSearchComponent {

  
  SearchPorterForm:any =FormGroup;

  constructor(      
    private formBuilder:FormBuilder,
    private route: ActivatedRoute, 
    private router: Router,
    private sharedService:MiDataService,
    private elementRef: ElementRef
   ){
  }

  ngOnInit(): void {
   
    this.SearchPorterForm = this.formBuilder.group({
      search:['']
    });
    this.router.navigate( ['porter-distributor'] , { relativeTo: this.route }); 
  }

  PorterSubmit() {
   
    const formdata = this.SearchPorterForm.value;
    const value:string =formdata.search;
    this.sharedService.setSearchData(value);
    this.sharedService.triggerHandleSubmit();
  }

}
