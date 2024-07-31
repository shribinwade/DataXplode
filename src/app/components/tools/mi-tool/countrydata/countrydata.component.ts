import { Component, Input, SimpleChanges } from '@angular/core';
import { ECommerceSitesService } from '../../../../e-commerce-sites.service';

@Component({
  selector: 'app-countrydata',
  templateUrl: './countrydata.component.html',
  styleUrl: './countrydata.component.scss'
})
export class CountrydataComponent {
  
  constructor(private ecommerceSites: ECommerceSitesService){}

  @Input() country!: string;                 //country data take from mi tool parent component

  isVisible: boolean = false;

  filteredSites!: { id:number;name: string; src: string }[];

  ngOnChanges(changes: SimpleChanges): void {
    this.filterSitesByCountry();
  }

  filterSitesByCountry() {
    const countryData = this.ecommerceSites.eCommerceSites.find(
      (c) => c.country === this.country
    );
    this.filteredSites = countryData ? countryData.sites : [];
  }
}
