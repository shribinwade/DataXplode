import { Component, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from '../../shared-service/data-service.service';
import {  MatDialogConfig, MatDialogRef , MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle } from '@angular/material/dialog';
import { FinancialComponent } from '../../dialog-component/financial/financial.component';
import { BcgMatrixChartComponent } from '../../dialog-component/BCG-matrix-chart/bcg-matrix-chart/bcg-matrix-chart.component';
import { BcgMatrixComponent } from '../../../bcg-matrix/bcg-matrix.component';
import { Subscription } from 'rxjs';
import { fadeInOutAnimation } from '../../../../shared/animations';

export interface brandList {
  Brand_list:brandData[];

}

export interface brandData{
  Brand:string;
  Company:string;
  Segment:string;
  market_share:string;
  Market_Growth_Rate:string;
  bcg_value:string;
}
export interface Brand {
  index: number;
  brand: string;
  company: string;
  segment:string;
  marketShare:string;
  MarketGrouthRate:string;
  bcgValue:string;

}

@Component({
  selector: 'app-market-leader',
  templateUrl: './market-leader.component.html',
  styleUrl: './market-leader.component.scss',
  animations: [fadeInOutAnimation]

})
export class MarketLeaderComponent {

  public subscription!: Subscription;

  dataSource= new MatTableDataSource<Brand>();



  hiddendata:boolean = true;

  searchData!: brandList;

  constructor(
    private dataService: DataServiceService,
    private dialog: MatDialog,
    private elementRef: ElementRef
  ) {}
  
  displayedColumns: string[] = ['index','name','company','segment','marketShare','MarketGrouthRate','bcgValue'];

  ngOnInit(): void {
    // const searchData: brandList = this.dataService.getSearchData();
    this.subscription = this.dataService.getSearchData().subscribe(data => {
      this.searchData = data;
      // The view will automatically update when `searchData` changes
    });

    if (this.searchData && this.searchData.Brand_list.length > 0) {
      const brands = this.transformData(this.searchData.Brand_list);
    
      
      this.dataSource = new MatTableDataSource<Brand>(brands);
      this.hiddendata = false; // Show the table if data is available
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Clean up subscription to avoid memory leaks
    }
    this.elementRef.nativeElement.remove();

  }

  private transformData(brandList: brandData[]): Brand[] {
    return brandList.map((Brand, index) => {
      const [brand] = Brand.Brand.split(' - ');
      const company = Brand.Company;
      const segment = Brand.Segment;
      const marketShare = Brand.market_share;
      const MarketGrouthRate = Brand.Market_Growth_Rate;
      const bcgValue = Brand.bcg_value;
    
      

      const cleanName = brand.replace(/^\d+\.\s*/, ''); // Remove leading number and period
      
      return { index: index + 1, brand:cleanName, company ,segment,marketShare,MarketGrouthRate,bcgValue};
    });
  }

  //financial dialog component 
  handleBulletPointsAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(FinancialComponent, {
      width: '900px',
      
      // data: {bullet: this.BulletPoints}
      
    });
  
  }

  //BCG Matrix dialog component
  handleBCGMatrixAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '65%';
    dialogConfig.height = '90%';

    dialogConfig.panelClass = 'bcgchart-screen-dialog';

    dialogConfig.maxWidth = '100%';
    this.dialog.open(BcgMatrixComponent,dialogConfig);
  
  }

  // const dialogConfig = new MatDialogConfig();
  // dialogConfig.width = '90%';
  // dialogConfig.height = '90%';
  // dialogConfig.maxWidth = '100%';
  
  // dialogConfig.panelClass = 'full-screen-dialog';
  // dialogConfig.data = { Amazon_review_info: this.reviewreceivedData };
  // this.dialog.open(ReviewlistComponent, dialogConfig);


}
