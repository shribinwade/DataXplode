import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, catchError, of } from 'rxjs';
import { SkuService } from '../../../../../Services/sku.service';
import { MiDataService } from '../../../mi-service/mi-data.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {

  SearchProductForm:any =FormGroup;

  constructor(      
    private formBuilder:FormBuilder,
    private route: ActivatedRoute, 
    private router: Router,
    private sharedService:MiDataService,
    private elementRef: ElementRef
   ){
  }

  ngOnInit(): void {
   
    this.SearchProductForm = this.formBuilder.group({
      search:['']
    });
    this.router.navigate( ['sku-search-child'] , { relativeTo: this.route }); 
  }

  productSubmit() {
    debugger
    const formdata = this.SearchProductForm.value;
    const value:string =formdata.search;
    this.sharedService.setSearchData(value);
    this.sharedService.triggerHandleSubmit();
  }



}
