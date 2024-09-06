import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductMatrixService } from '../../../../../Services/product-matrix.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatrixResultService } from '../../../../competitor-analyzer/shared-service/matrix-result.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from '../../../../../Services/loading.service';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MiDataService } from '../../../mi-service/mi-data.service';

export interface Features {
  feature: string;
}

@Component({
  selector: 'app-competitor-analysis',
  templateUrl: './competitor-analysis.component.html',
  styleUrl: './competitor-analysis.component.scss'
})
export class CompetitorAnalysisComponent implements OnInit {

  features: Features[] = [];

  
  // step-I Inject the FormBuilder service in the component constructor()
  // This service is part of the ReactiveFormsModule module which you've already imported.
  constructor(
    public formBuilder:FormBuilder,
    private productmatrixService:ProductMatrixService,
    private router:Router,
    public dataService:MatrixResultService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private ref: MatDialogRef<CompetitorAnalysisComponent>,
    public loadingService:LoadingService,
    private shareData : MiDataService
  ){}


  //step-II To gather the formfield name and address, use the FormBuilder group() method to
  //        set the checkoutForm property to a form model containing name and address fields.


  /* 
          use like this or create FormGroup variable like   
    checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  
   });
   */
   checkoutForm:any =FormGroup;
   searchData: any[] = [];

   //now group frombuilder 
   ngOnInit(): void {
      this.checkoutForm = this.formBuilder.group({
      Keyword:['',Validators.required],
      ProductName:'',
      Mrp:'',
      Sp:'',
      ProductDescription:'',
      Brand:['',Validators.required],
      features:[this.features,Validators.required],
      Image:''
     });
   
   }

     // Method to check if a form control has the required validator
  isRequired(controlName: string): boolean {
    const control: AbstractControl | null = this.checkoutForm.get(controlName);
    return control?.hasValidator(Validators.required) ?? false;
  }





  //step-III Define an onSubmit() method to process the form. This method allows users to submit their 
  //         name and address. In addition, this method uses the clearCart() method of the 
  //         CartService to reset the form and clear the cart.

  onSubmit(): void {
    // const formdata = this.checkoutForm.value;
    // console.log(formdata);
    // console.log(typeof(formdata));
    // // Process checkout data here
    // this.checkoutForm.reset();

    /////////////////////////////////////////////
   
    const formdata = this.checkoutForm.value;
   
    const formdatajson= JSON.stringify(formdata);

    this.shareData.setFormData(formdatajson);

   

    // typeof(formdata);
    // const data: string = formdata.search;
 
    this.productmatrixService.Post_get_amazon_info_details(formdata).subscribe(res =>{
     
    
     
     this.searchData= res;
    // this.searchData = res;
   

     this.dataService.setSearchData(this.searchData);
    
    // Redirect to the target route
   
    this.router.navigate(['services/tools/mi_tools/product-matrix-result'], { relativeTo: this.route });
    this.closepopup();

    })
    


  }
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  closepopup(){
    this.ref.close();
  }

  

  //step-IV  Use a formGroup property binding to bind checkoutForm to the HTML <form>.

  //step-V Add <input> fields for name and address, each with a formControlName attribute 
  //       that binds to the checkoutForm form controls for name and address to their <input> fields. 
  
  
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


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
