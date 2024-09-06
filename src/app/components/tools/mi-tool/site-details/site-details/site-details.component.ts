import { Component } from '@angular/core';
import { ECommerceSitesService } from '../../../../../e-commerce-sites.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrl: './site-details.component.scss'
})
export class SiteDetailsComponent {
  
  productSite!:string;
  productSiteName!:any
  productSiteImgSrc!:String;
  productId:any;
  
  constructor(private activatedRoute:ActivatedRoute, private ecommarcesites:ECommerceSitesService  ){

  }
  ngOnInit(): void {
    this.productId=this.activatedRoute.snapshot.paramMap.get('id');
    this.productSiteName=this.activatedRoute.snapshot.paramMap.get('name');
    this.productSiteImgSrc=getImgSrc(this.ecommarcesites,this.productId);  

    
  }
  

  goBack(): void {
    // this.location.back();
  }
}

function getImgSrc(ecommarcesites: ECommerceSitesService, productId: any) {
  let imgsrc!:String;
  for(let site of ecommarcesites.eCommerceSites){
        for(let sites of site.sites){
                 if(sites.id==productId){
                  return sites.src;
                 }
        }
  }
  return "null";
}


