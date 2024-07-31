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


//   productA: ProductMatrix = {} as ProductMatrix;
//   productB: ProductMatrix = {} as ProductMatrix;

//   properties: ProductMatrixKey[] = Object.keys(DISPLAY_NAMES) as ProductMatrixKey[];


//   // hiddendata: boolean = true;
 
//   // properties: ProductMatrixKey[] = [
//   //   'Product_url', 
//   //   'product_name', 'position', 'Description', 'Image_url', 'MRP', 'SP', 'avg_rating',
//   //   'rating_count', 'seller_name', 'Rating_value', 'Rating_count', 'Sales_Package', 'Brand', 'Model_Name',
//   //   'Quantity', 'Pack_of', 'Ideal_For', 'Type', 'Maximum_Shelf_Life', 'Organic', 'Fragrance_Scent', 'Color',
//   //   'Brand_Fragrance', 'Skin_Type', 'Application_Area', 'Composition', 'Other_Traits', 'Country_of_Origin'
//   // ];
  
  
 
  
  
  
  

//   constructor(private dataService: MatrixResultService) {}

//   ngOnInit(): void {
//     this.fetchData();
//   }
//   displayedColumns: string[] = ['property', 'productA', 'productB'];
//   fetchData(): void {
//     const searchData = this.dataService.getSearchData();
//     if (searchData && searchData.length >= 2) {
//       this.productA = searchData[0];
//       this.productB = searchData[1];
//       console.log('productA:', this.productA);
//       console.log('productB:', this.productB);
//     }
//   }



//     // Method to get the value of a property from a product
//     getPropertyValue(product: ProductMatrix, property: ProductMatrixKey): any {
//       if (property === 'Product_url') {
//         return `<a href="${product[property]}" target="_blank">${product[property]}</a>`;
//       }
//       if (property === 'Image_url') {
//         return `<a href="${product[property]}" target="_blank">
//                   <img src="${product[property]}" alt="Product Image" style="max-width: 100px; max-height: 100px;">
//                 </a>`;
//       }
//       return product[property];
//     }
//     getDisplayName(property: ProductMatrixKey): string {
//       return DISPLAY_NAMES[property];
//     }
// }
