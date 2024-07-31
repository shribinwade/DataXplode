import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsComponent } from './tools.component';
import { MiToolComponent } from './mi-tool/mi-tool.component';
import { PriceOptimizationComponent } from './price-optimization/price-optimization.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import { SiteDetailsComponent } from './mi-tool/site-details/site-details/site-details.component';
import { CountrydataComponent } from './mi-tool/countrydata/countrydata.component';
import { FullcomponentComponent } from '../layout/sidebar/full/fullcomponent/fullcomponent.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SkuDashboardComponent } from './mi-tool/product-search/sku-dashboard/sku-dashboard.component';
import { KeywordSearchComponent } from './mi-tool/keyword-search/keyword-search.component';
import { MarkertsearchComponent } from '../markertsearch/markertsearch.component';
import { CompetitorAnalysisComponent } from '../competitor-analysis/competitor-analysis.component';
import { MarketTrendComponent } from '../markertsearch/child-components/market-trend/market-trend.component';
import { MarketLeaderComponent } from '../markertsearch/child-components/market-leader/market-leader.component';
import { MarketNewsComponent } from '../markertsearch/child-components/market-news/market-news.component';
import { MarketSearchResultComponent } from '../markertsearch/child-components/market-search-result/market-search-result.component';
import { NewsResultComponent } from '../markertsearch/child-components/news-data/news-result/news-result.component';
import { InnovationComponent } from '../markertsearch/child-components/innovation/innovation.component';



const routes: Routes = [
 
  { path: 'services/tools/mi_tools', component: MiToolComponent},
  { path:'price_optimization', component: PriceOptimizationComponent},
  { path: 'sentiment_analysis',component: SentimentAnalysisComponent},
  // { path: 'services/tools/mi_tools/product-details/:name/:id',component: SiteDetailsComponent},
  // {
  //   path: 'product-service',
  //   component: CountrydataComponent,
  //   children: [
  //     { path: 'product-details/:name/:id', component: SiteDetailsComponent} // Nested route with ID parameter
  //   ]
  // }
  {
    path:'services',
    component: FullcomponentComponent,
    children: [
           {
            path: '',
            redirectTo: '',
            pathMatch: 'full',
           },
           {
            path: 'dashboard',
            component: DashboardComponent,
          },
          {
            path: 'tools/mi_tools',
            component: MiToolComponent
          },
          {
             path: 'tools/mi_tools/product-details/:name/:id',component: SiteDetailsComponent,
          },
          {
            path: 'tools/mi_tools/product-details/:name/:id/sku-search',component:SkuDashboardComponent
          },
          {
            path: 'tools/mi_tools/product-details/:name/:id/keyword-search',component:KeywordSearchComponent
          },
          {
            path: 'tools/mi_tools/product-details/:name/:id/market-search',component:MarkertsearchComponent,
            children: [
              { path: 'market-trend', component: MarketTrendComponent, outlet: 'content' },
              { path: 'market-leader', component: MarketLeaderComponent, outlet: 'content' },
              { path: 'innovation', component: InnovationComponent, outlet: 'content' },
              {
                path: 'search-result',
                component: MarketSearchResultComponent,
                outlet: 'content',
                children: [
                  { path: 'search-result', component: NewsResultComponent, outlet: 'searchnews' },
                  { path: 'news', component: MarketNewsComponent, outlet: 'searchnews' },
                 
                ]
              }
            ]
          },
          {
            path: 'tools/mi_tools/product-details/:name/:id/competitor-analysis',component:CompetitorAnalysisComponent
          },
          
          
        
    ],
    

  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
