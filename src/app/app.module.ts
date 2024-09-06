import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/layout/sidebar/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

import { BodyComponent } from './components/layout/sidebar/body/body.component';


import { SublevelMenuComponent } from './components/layout/sidebar/sidenav/sublevel-menu.component';
import { HomeComponent } from './components/home/home.component';
import { ReviewListComponent } from './material-component/dialog/review-list/review-list.component';
import { SpecificationComponent } from './material-component/dialog/specification/specification.component';
import { BulletpointsComponent } from './material-component/dialog/bulletpoints/bulletpoints.component';
import { ReviewAnalysisComponent } from './material-component/dialog/review-analysis/review-analysis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FullcomponentComponent } from './components/layout/sidebar/full/fullcomponent/fullcomponent.component';
import { ToolsModule } from './components/tools/tools.module';


import { MarkertsearchComponent } from './components/markertsearch/markertsearch.component';

import { MarketTrendComponent } from './components/markertsearch/child-components/market-trend/market-trend.component';
import { MarketLeaderComponent } from './components/markertsearch/child-components/market-leader/market-leader.component';
import { MarketNewsComponent } from './components/markertsearch/child-components/market-news/market-news.component';
import { MarketSearchResultComponent } from './components/markertsearch/child-components/market-search-result/market-search-result.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FinancialComponent } from './components/markertsearch/dialog-component/financial/financial.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BcgMatrixComponent } from './components/bcg-matrix/bcg-matrix.component';
import { BcgMatrixChartComponent } from './components/markertsearch/dialog-component/BCG-matrix-chart/bcg-matrix-chart/bcg-matrix-chart.component';
import { CompititorAnalyzerComponent } from './components/competitor-analyzer/compititor-analyzer/compititor-analyzer.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CacheInterceptor } from './caching/core/cache.interceptor';
import { MatrixResultComponentComponent } from './components/competitor-analyzer/result-component/matrix-result-component/matrix-result-component.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CdkTableModule } from '@angular/cdk/table';
import { ReadMoreDirective } from './directives/ReadMore/read-more.directive';
import { ReviewDialogComponent } from './components/competitor-analyzer/result-component/matrix-result-component/Dialog/ReviewDialog/review-dialog/review-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { CharCodeToLetterPipe } from '../CustomPipe/char-code-to-letter.pipe';
import { SwotAnalysisComponent } from './components/competitor-analyzer/result-component/matrix-result-component/Dialog/SwoatAnalysis/swot-analysis/swot-analysis.component';

import { ReviewSentimentChartComponent } from './review-sentiment-chart/review-sentiment-chart.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NewsResultComponent } from './components/markertsearch/child-components/news-data/news-result/news-result.component';
import { InnovationComponent } from './components/markertsearch/child-components/innovation/innovation.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSort, MatSortModule } from '@angular/material/sort';



// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
// text:"Loading...",
// textColor:"#FFFFFF",
// textPosition:"center-center",
// bgsColor: "#2660d2",
// fgsColor: "#2660d2",
// fgsType:SPINNER.chasingDots,
// fgsSize:100,
// hasProgressBar:true
// }



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    StatisticsComponent,
    SublevelMenuComponent,
    HomeComponent,
    ReviewListComponent,
    SpecificationComponent,
    BulletpointsComponent,
    ReviewAnalysisComponent,
    FullcomponentComponent,
    BodyComponent,
    MarkertsearchComponent,
    MarketTrendComponent,
    MarketLeaderComponent,
    MarketNewsComponent,
    MarketSearchResultComponent,
    FinancialComponent,
    BcgMatrixComponent,
    BcgMatrixChartComponent,
    CompititorAnalyzerComponent,
    MatrixResultComponentComponent,
    ReviewDialogComponent,
    CharCodeToLetterPipe,
    SwotAnalysisComponent,
    ReviewSentimentChartComponent,
    NewsResultComponent,
    InnovationComponent,
    PagenotfoundComponent,
  
     
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToolsModule,
    FormsModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    CdkTableModule,
    MatCheckboxModule,
    SharedModule,
    BrowserAnimationsModule,
    MatSortModule
   
    
    
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, 
     useClass: CacheInterceptor , 
     multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
