import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ECommerceSitesService } from '../../../../../e-commerce-sites.service';
import {  MatDialogConfig, MatDialogRef , MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle } from '@angular/material/dialog';
import { SpecificationComponent } from './components/dialog/specification/specification.component';
import { BulletpointsComponent } from './components/dialog/bulletpoints/bulletpoints.component';
import { ReviewAnalysisComponent } from './components/dialog/review-analysis/review-analysis.component';
import { ReviewlistComponent } from './components/dialog/reviewlist/reviewlist.component';
import { LoadingService } from '../../../../../Services/loading.service';
import { SkuService } from '../../../../../Services/sku.service';

interface ProductFeatures {
  Brand?: string;
  ItemForm?: string;
  ItemVolume?: string;
  Scent?: string;
  SpecialFeature?: string;
  ProductDimensions?: string;
  DateFirstAvailable?: string;
  Manufacturer?: string;
  ASIN_?: string;
  ItemModelNumber?: string;
  CountryOfOrigin?: string;
  Packer?: string;
  ItemWeight?: string;
  ItemDimensionsLxWxH?: string;
  NetQuantity?: string;
  IncludedComponents?: string;
  GenericName?: string;
  BestSellersRank?: string;
  CustomerReviews?: string;
}

interface AmazonInfo {
  Product_name: string;
  Product_url: string;
  Important_information: string;
  Availablity: string;
  MRP: string;
  Selling_Price: string;
  Discount: number;
  Description: string;
  Image_count: number;
  Image_url: string;
  Rating_value: number;
  Rating_count: string;
  Review_count: string;
  Content_images: string;
  Bullet_point: string;
  reseller_name: string;
  Product_features: ProductFeatures[];
  // Include other properties if necessary
}

interface ReceivedData {
  Amazon_info: AmazonInfo[];
  // Include other properties if necessary
}
@Component({
  selector: 'app-sku-dashboard',
  templateUrl: './sku-dashboard.component.html',
  styleUrl: './sku-dashboard.component.scss',
})
export class SkuDashboardComponent implements OnInit {

  selectedImage = `assets/indiaflag.png`;
  coordinates: any;
  public thumbnail = `assets/indiaflag.png`;
  public myFullresImage = `assets/indiaflag.png;`;

  productSiteName!: any;
  productSiteImgSrc!: any;
  SiteImgSrc!: string;
  ProductName!: string;
  MRP!: number;
  Selling_price!: number;
  Rating_value!: number;
  Rating_count!: string;
  Availablity!: string;
  Description!: string;
  Reseller!: string;
  Brand!: string;
  ASIN!: string;
  BulletPoints: any [] = [];

  // Api endpoint data
  receivedData!: ReceivedData;
  reviewreceivedData :any [] =[];
  
  // showing data after getting response
  showdata: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ecommarcesites: ECommerceSitesService,
    private dialog: MatDialog,
    public  loadingService: LoadingService,
    private skuservice:SkuService
  ) {}
   

  onClose(){
   
  }

  ngOnInit(): void {
    this.productSiteName = this.activatedRoute.snapshot.paramMap.get('name');
    this.SiteImgSrc = this.getImgSrc(this.ecommarcesites, this.productSiteName);
  }

  getdata(): boolean {
    return this.showdata;
  }

  //handling recevied data from child
  handleReviewDataReceived(data: any) {
    if (data != null) {
      this.reviewreceivedData = data;
    }
    console.log(this.reviewreceivedData);
    }
 //handling recevied data from child
  handleDataReceived(data: any): void {
    if (data != null) {
      this.receivedData = data;
      this.showdata = false;
    }
    this.productSiteImgSrc = this.getImageUrls();
    this.ProductName = this.getProductName();
    this.MRP = this.getMRP();
    this.Rating_value = this.getRatingValue();
    this.Selling_price = this.getSellingPrice();
    this.Rating_count = this.getRatingCount();
    this.Availablity = this.getAvailablity();
    this.Description = this.getDescription();
    this.Reseller = this.getReseller();
    this.Brand = this.getBrand();
    this.ASIN = this.getASIN();
    this.BulletPoints = this.getBulletPoints(); 

    console.log(this.BulletPoints);
    console.log('Data received from child:', this.receivedData);
    // Process the received data as needed
  }

  //Dialog components
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  handleSpecificationAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    
    this.dialog.open(SpecificationComponent, { width: '900px',
      height: '400px',
      data: {product_features: this.receivedData?.Amazon_info?.[0]?.Product_features} 
    });
  }
  handleReviewListAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '100%';
    
    dialogConfig.panelClass = 'full-screen-dialog';
    dialogConfig.data = { Amazon_review_info: this.reviewreceivedData };
    this.dialog.open(ReviewlistComponent, dialogConfig);
  }
  handleReviewAnalysisAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ReviewAnalysisComponent, dialogConfig);
  }
  handleBulletPointsAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(BulletpointsComponent, {
      width: '900px',
      
      data: {bullet: this.BulletPoints}
      
    });
  
  }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  getBulletPoints(): any {   
    if (this.receivedData && this.receivedData.Amazon_info) {
      return this.receivedData.Amazon_info.map(
        (info: any) => this.parseBulletString(info.Bullet_point) // Parse bullet string
      );
    }
    return []; // Return an empty array if there is no received data 
  }

  parseBulletString(bulletString: string): any[] {
    if (bulletString.includes(':')) {
      // Split by both ':' and '\n'
      return bulletString.split('\n').map(line => {
        const [key, value] = line.split(':', 2);
        return { key: key.trim(), value: value.trim() };
      }).filter(pair => pair.key && pair.value);
    } else {
      // Split only by '\n'
      return bulletString.split('\n').filter(line => line.trim() !== '');
    }
  }
  getASIN(): string {
    return (
      this.receivedData?.Amazon_info?.[0]?.Product_features.find((feature: any) => feature.ASIN_)?.ASIN_ || '');
  }
  getBrand(): string {
    return (
      this.receivedData?.Amazon_info?.[0]?.Product_features.find(
        (feature: any) => feature.Brand
      )?.Brand || ''
    );
  }
  getReseller(): any {
    if (this.receivedData && this.receivedData.Amazon_info) {
      return this.receivedData.Amazon_info.map(
        (info: any) => info.reseller_name
      );
    }
  }
  getDescription(): any {
    if (this.receivedData && this.receivedData.Amazon_info) {
      return this.receivedData.Amazon_info.map((info: any) => info.Description);
    }
  }
  getAvailablity(): any {
    if (this.receivedData && this.receivedData.Amazon_info) {
      return this.receivedData.Amazon_info.map((info: any) => info.Availablity);
    }
  }

  getRatingCount(): any {
    if (this.receivedData && this.receivedData.Amazon_info) {
      return this.receivedData.Amazon_info.map(
        (info: any) => info.Rating_count
      );
    }
  }

  getSellingPrice(): number {
    if (this.receivedData && this.receivedData.Amazon_info) {
      const SellingPrice = Number(this.receivedData.Amazon_info.map((info: any) => info.Selling_Price));
      if (isNaN(SellingPrice)) {
        console.error(
          'Invalid MRP value:',
          this.receivedData.Amazon_info[0].MRP
        );
        return 0; // or handle invalid MRP values appropriately
      }
      return SellingPrice;
    }
    return 0;
  }

  getRatingValue(): any {
    if (this.receivedData && this.receivedData.Amazon_info) {
      return this.receivedData.Amazon_info.map(
        (info: any) => info.Rating_value
      );
    }
  }

  getMRP(): number {
    if (
      this.receivedData &&
      this.receivedData.Amazon_info &&
      this.receivedData.Amazon_info.length > 0
    ) {
      const mrp = Number(
        this.receivedData.Amazon_info.map((info: any) => info.MRP)
      );
      if (isNaN(mrp)) {
        console.error(
          'Invalid MRP value:',
          this.receivedData.Amazon_info[0].MRP
        );
        return 0; // or handle invalid MRP values appropriately
      }
      return mrp;
    }
    return 0;
  }

  getImageUrls(): string[] {
    if (this.receivedData && this.receivedData.Amazon_info) {
      console.log('Extracting image URLs from:', this.receivedData.Amazon_info);
      return this.receivedData.Amazon_info.map((info: any) => info.Image_url);
    }
    return [];
  }

  getProductName(): any {
    if (this.receivedData && this.receivedData.Amazon_info) {
      return this.receivedData.Amazon_info.map(
        (info: any) => info.Product_name
      );
    }
  }

  getImgSrc(ecommarcesites: ECommerceSitesService, productSiteName: any) {
    let imgsrc!: String;
    for (let site of ecommarcesites.eCommerceSites) {
      for (let sites of site.sites) {
        if (sites.name == productSiteName) {
          return sites.src;
        }
      }
    }
    return 'null';
  }

  goBack(): void {
    // this.location.back();
  }
}
