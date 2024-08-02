import { Component, OnInit } from '@angular/core';
import { MatrixResultService } from '../../shared-service/matrix-result.service';
import {  MatDialogConfig, MatDialogRef , MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle } from '@angular/material/dialog';
import { ReviewlistComponent } from '../../../tools/mi-tool/product-search/sku-dashboard/components/dialog/reviewlist/reviewlist.component';
import { switchMap } from 'rxjs';
import { SkuService } from '../../../../Services/sku.service';
import { ReviewDialogComponent } from './Dialog/ReviewDialog/review-dialog/review-dialog.component';
import { SwotAnalysisComponent } from './Dialog/SwoatAnalysis/swot-analysis/swot-analysis.component';
import { MatTableDataSource } from '@angular/material/table';
import { ReviewSentimentChartComponent } from '../../../../review-sentiment-chart/review-sentiment-chart.component';







@Component({
  selector: 'app-matrix-result-component',
  templateUrl: './matrix-result-component.component.html',
  styleUrls: ['./matrix-result-component.component.scss']
})
export class MatrixResultComponentComponent implements OnInit {


 
  featureKeys:string[]=[];
  
  headers:string[]=['Features'];

  data:any[] = [];

  constructor(
    private skuservice:SkuService ,private dataService: MatrixResultService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }
  

  
  
   fetchData(): void {
    
    debugger
    // GETTING DATA FROM SERVICE
    const searchData = this.dataService.getSearchData();
    
    const productValues =Object.values(searchData.Search_result);
    this.featureKeys = Object.keys(searchData.Search_result[0]);

    this.featureKeys.push("More Info")
    
    const productKeys = Object.keys(searchData.Search_result);
    const mappedProductKeys = productKeys.map((key, index) => `product${String.fromCharCode(65 + index)}`);
    

     for(let data of mappedProductKeys){
      this.headers.push(data);
     }

     for(let value of productValues){
      console.log(value);
      
      this.data.push(value);
     }
    
     


     console.log(this.headers);
     console.log(searchData);
     console.log(this.data);
     

    console.log("mappedProductKeys"+mappedProductKeys);
    
    console.log("productKeys"+productKeys);

   
  }

    

  openSwotAnalysis(product:any){
    debugger
    console.log(product);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    
    dialogConfig.panelClass = 'swot-full-screen';
    // dialogConfig.data = { asinData };
    this.dialog.open(SwotAnalysisComponent, dialogConfig);
    

  }



  openReviewDialog(asinData:string){
    debugger
    console.log(asinData);


  
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    
    dialogConfig.panelClass = 'full-screen-dialog';
    dialogConfig.data = { asinData };
    this.dialog.open(ReviewDialogComponent, dialogConfig);
  }

  openReviewAnalysisDialog(){
    debugger
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    
    dialogConfig.panelClass = 'full-screen-dialog';
   
    this.dialog.open(ReviewSentimentChartComponent, dialogConfig);
  }

}



