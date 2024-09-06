import { Component, ElementRef, OnInit } from '@angular/core';
import { MatrixResultService } from '../../shared-service/matrix-result.service';
import {  MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SkuService } from '../../../../Services/sku.service';
import { ReviewDialogComponent } from './Dialog/ReviewDialog/review-dialog/review-dialog.component';
import { SwotAnalysisComponent } from './Dialog/SwoatAnalysis/swot-analysis/swot-analysis.component';
import { ReviewSentimentChartComponent } from '../../../../review-sentiment-chart/review-sentiment-chart.component';
import { JsonPipe } from '@angular/common';
import { MiDataService } from '../../../tools/mi-service/mi-data.service';


@Component({
  selector: 'app-matrix-result-component',
  templateUrl: './matrix-result-component.component.html',
  styleUrls: ['./matrix-result-component.component.scss']
})
export class MatrixResultComponentComponent implements OnInit {


 
  featureKeys:string[]=[];
  headers:string[]=['Features'];
  data:any[] = [];
  swotData:any [] = [];
  productvalues:any;

  constructor(
    private skuservice:SkuService,
    private dataService: MatrixResultService,
    private dialog: MatDialog,
    private elementRef: ElementRef,
    private formDataService: MiDataService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {

    // GETTING DATA FROM SERVICE 
    const formData = this.formDataService.getFormData();
    const searchData = this.dataService.getSearchData();
    const productValues =Object.values(searchData.Search_result);
    this.productvalues = productValues;
    this.featureKeys = Object.keys(searchData.Search_result[0]);
    this.featureKeys.push("More Info")
    const productKeys = Object.keys(searchData.Search_result);
    const mappedProductKeys = productKeys.map((key, index) => `product${String.fromCharCode(65 + index)}`);
    

     for(let data of mappedProductKeys){
     
      
      this.headers.push(data);
     }

     for(let value of productValues){
    
      this.data.push(value);
     }
  
     const SearchDatajson =JSON.stringify(searchData.Search_result);
  
     this.swotData.push(formData);
     this.swotData.push(SearchDatajson);
   
     
  }

    

  openSwotAnalysis(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    dialogConfig.data = this.swotData;
    dialogConfig.panelClass = 'swot-full-screen';
    // dialogConfig.data = { asinData };
    this.dialog.open(SwotAnalysisComponent, dialogConfig);
  }



  openReviewDialog(asinData:string){
   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    
    dialogConfig.panelClass = 'full-screen-dialog';
    dialogConfig.data = { asinData };
    this.dialog.open(ReviewDialogComponent, dialogConfig);
  }

  openReviewAnalysisDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    
    dialogConfig.panelClass = 'full-screen-dialog';
   
    this.dialog.open(ReviewSentimentChartComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  
  

}



