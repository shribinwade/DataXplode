import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-competitor-analysis',
  templateUrl: './competitor-analysis.component.html',
  styleUrl: './competitor-analysis.component.scss'
})
export class CompetitorAnalysisComponent implements OnInit {

  
  // step-I Inject the FormBuilder service in the component constructor()
  // This service is part of the ReactiveFormsModule module which you've already imported.
  constructor(public formBuilder:FormBuilder){}


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

   //now group frombuilder 
   ngOnInit(): void {
      this.checkoutForm = this.formBuilder.group({
      keyword:'',
      productName:'',
      mrp:'',
      sp:'',
      productDescription:'',
      brand:'',
      features:'',
      image:''
     });
   
   }





  //step-III Define an onSubmit() method to process the form. This method allows users to submit their 
  //         name and address. In addition, this method uses the clearCart() method of the 
  //         CartService to reset the form and clear the cart.

  onSubmit(): void {
    const formdata = this.checkoutForm.value;
    console.log(formdata);
    console.log(typeof(formdata));
    // Process checkout data here
    this.checkoutForm.reset();

  }

  //step-IV  Use a formGroup property binding to bind checkoutForm to the HTML <form>.

  //step-V Add <input> fields for name and address, each with a formControlName attribute 
  //       that binds to the checkoutForm form controls for name and address to their <input> fields. 






}
