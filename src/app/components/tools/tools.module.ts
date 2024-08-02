import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';
import { MiToolComponent } from './mi-tool/mi-tool.component';
import { PriceOptimizationComponent } from './price-optimization/price-optimization.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import { TopLogosComponent } from './mi-tool/top-logos/top-logos/top-logos.component';
import { CountrydataComponent } from './mi-tool/countrydata/countrydata.component';
import { NextDirective } from './mi-tool/top-logos/top-logos/directives/next.directive';
import { PrevDirective } from './mi-tool/top-logos/top-logos/directives/prev.directive';
import { SiteDetailsComponent } from './mi-tool/site-details/site-details/site-details.component';
import { SkuDashboardComponent } from './mi-tool/product-search/sku-dashboard/sku-dashboard.component';
import { SkuSearchCardComponent } from './mi-tool/product-search/sku-search-card/sku-search-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {MatDialogModule} from '@angular/material/dialog';

import { SpecificationComponent } from './mi-tool/product-search/sku-dashboard/components/dialog/specification/specification.component';
import { BulletpointsComponent } from './mi-tool/product-search/sku-dashboard/components/dialog/bulletpoints/bulletpoints.component';
import { ReviewlistComponent } from './mi-tool/product-search/sku-dashboard/components/dialog/reviewlist/reviewlist.component';
import { ReviewAnalysisComponent } from './mi-tool/product-search/sku-dashboard/components/dialog/review-analysis/review-analysis.component';

import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

import { StarRatingComponent } from '../star-rating/star-rating.component';
import { KeywordSearchComponent } from './mi-tool/keyword-search/keyword-search.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { InterceptorService } from '../../Services/interceptor.service';




@NgModule({
  declarations: [
    
    ToolsComponent,
    MiToolComponent,
    PriceOptimizationComponent,
    SentimentAnalysisComponent,
    TopLogosComponent,
    CountrydataComponent,
    NextDirective,
    PrevDirective,
    SiteDetailsComponent,
    SkuDashboardComponent,
    SkuSearchCardComponent,
    SpecificationComponent,
    BulletpointsComponent,
    ReviewlistComponent,
    ReviewAnalysisComponent,
    KeywordSearchComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ToolsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,  
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
    
  ],
  providers: [
    
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService , multi: true}
  ],
})
export class ToolsModule { }
