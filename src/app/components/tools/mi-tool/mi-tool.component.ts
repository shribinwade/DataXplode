import { Component, ElementRef, ViewChild } from '@angular/core';
import { ECommerceSitesService } from '../../../e-commerce-sites.service';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { CompetitorAnalysisComponent } from './childComponent/competitor-analysis/competitor-analysis.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mi-tool',
  templateUrl: './mi-tool.component.html',
  styleUrl: './mi-tool.component.scss'
})
export class MiToolComponent  {

  
  
  ecommarcebrands:any;
  selectedSites = '';
  selectedCountry = '';
  selectedService= '';
 
  constructor(
    private ecommarcesites:ECommerceSitesService,
    private dialog:MatDialog,
    private router:Router
   )
    
    {
    this.ecommarcebrands=ecommarcesites.eCommerceSites
    };


  @ViewChild('country') country!: ElementRef;

  @ViewChild('sites') sites!: ElementRef;
  onSelectedService():void{
    this.selectedSites =  this.sites.nativeElement.value;
  }

  @ViewChild('service') service!:ElementRef;
 
  onSelectService(){
     this.selectedService= this.service.nativeElement.value;
    //  console.log(this.selectedService)  
    if (this.selectedService === 'competitor-analysis') {
      this.openDialog();
    } 

    if (this.selectedService === '') {
      // Perform your redirection or logic when "--Select Service--" is chosen
      this.router.navigate(['/services/tools/mi_tools/']); // Replace with your route
  
    } else {
      // Handle other selected options if needed
    }


  }

  //open dialog || pop up method
   
  openDialog():void{
    const dialogConfig = new MatDialogConfig();
   
   
    
    
    this.dialog.open(CompetitorAnalysisComponent, 
      { 
      width: '80%',
      height: 'auto',          // Adjust the height based on the content
      maxHeight: '80vh',       // Set a maximum height for the dialog
      
    });
  
  }


  
  onSelected():void {
		this.selectedCountry = this.country.nativeElement.value;
    this.filterSites();
	}

  goToService() {
    this.router.navigate(['services/tools/mi_tools/']);
  }


  filteredSites: Array<{ id: number; name: string; src: string }> = [];
  filterSites() {
    debugger
    if(this.selectedCountry){
     const selectedCountrySites=  this.ecommarcebrands.find((site:any)=>site.country === this.selectedCountry);
     this.filteredSites = selectedCountrySites ? selectedCountrySites.sites : [];
    }
    else{
      this.filteredSites=[];
    }
  }




  // selectedCountry!: any;

  eventHandler($event: any) {
    this.selectedCountry = $event;
  }
}
