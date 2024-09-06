import { Component, ElementRef, ViewChild } from '@angular/core';
import { ECommerceSitesService } from '../../../e-commerce-sites.service';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { CompetitorAnalysisComponent } from './childComponent/competitor-analysis/competitor-analysis.component';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-mi-tool',
  templateUrl: './mi-tool.component.html',
  styleUrl: './mi-tool.component.scss',
  animations:[
    trigger('hideAnimation',[
      state('normal',style({
        transform: 'translateX(0%)',
        // col-lg-4 equivalent
        opacity: 1,
      })),
      state('max',style({
      transform: 'translateY(-40%),translateX(-30%)',
      
       width: '25%',   // col-lg-12 equivalent
       opacity: 0,
       display:'none'

      })),
      transition('normal => max', [
        animate('0.5s ease-in-out')
      ]),
      transition('max => normal', [
        animate('0.5s 0.6s ease-in-out')
      ])
    ]),
    trigger('toggleAnimation', [
      state('normal', style({
        height: 'auto',
        opacity: 1,
      })),
      state('max', style({
        height: '100vh',
        width: '100%', // col-lg-12 equivalent
        opacity: 1, 
      })),
      transition('normal => max', [
        animate('0.5s 0.6s ease-in-out')
      ]),
      transition('max => normal', [
        animate('0.5s  ease-in-out')
      ])
    ]),
  ]
})
export class MiToolComponent  {

  
  
  ecommarcebrands:any;
  selectedSites = '';
  selectedCountry = '';
  selectedService= '';
 
  constructor(
    private ecommarcesites:ECommerceSitesService,
    private dialog:MatDialog,
    private router:Router,
    private route: ActivatedRoute,
   ){
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

  maxView = false;

  toggleView() {
    this.maxView = !this.maxView;
  }
}
