import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/layout/sidebar/sidenav/sidenav.component';
import { FullcomponentComponent } from './components/layout/sidebar/full/fullcomponent/fullcomponent.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MiToolComponent } from './components/tools/mi-tool/mi-tool.component';
import { CountrydataComponent } from './components/tools/mi-tool/countrydata/countrydata.component';
import { CompititorAnalyzerComponent } from './components/competitor-analyzer/compititor-analyzer/compititor-analyzer.component';
import { MatrixResultComponentComponent } from './components/competitor-analyzer/result-component/matrix-result-component/matrix-result-component.component';
import { ReviewSentimentChartComponent } from './review-sentiment-chart/review-sentiment-chart.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SiteDetailsComponent } from './components/tools/mi-tool/site-details/site-details/site-details.component';
import { CompetitorAnalysisComponent } from './components/competitor-analysis/competitor-analysis.component';
import { InnovationComponent } from './components/markertsearch/child-components/innovation/innovation.component';
import { MarketLeaderComponent } from './components/markertsearch/child-components/market-leader/market-leader.component';
import { MarketNewsComponent } from './components/markertsearch/child-components/market-news/market-news.component';
import { MarketSearchResultComponent } from './components/markertsearch/child-components/market-search-result/market-search-result.component';
import { MarketTrendComponent } from './components/markertsearch/child-components/market-trend/market-trend.component';
import { NewsResultComponent } from './components/markertsearch/child-components/news-data/news-result/news-result.component';
import { MarkertsearchComponent } from './components/markertsearch/markertsearch.component';
import { KeywordSearchComponent } from './components/tools/mi-tool/keyword-search/keyword-search.component';
import { SkuDashboardComponent } from './components/tools/mi-tool/product-search/sku-dashboard/sku-dashboard.component';
import { SentimentAnalysisComponent } from './components/tools/sentiment-analysis/sentiment-analysis.component';
import { PriceOptimizationComponent } from './components/tools/price-optimization/price-optimization.component';

const routes: Routes = [
   {path:'', component: HomeComponent},
  {
    path: 'services',
    component: FullcomponentComponent,
    children: [
      
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      { 
        path: 'product-matrix-result', component: MatrixResultComponentComponent 
      },
      {
        path: 'review-sentiment-chart',component: ReviewSentimentChartComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'competitor-analyzer',
        component: CompititorAnalyzerComponent,
      },
      {
        path: 'tools',
        children: [
          {
            path: 'mi_tools',
            children: [
              {
                path: '',
                component: MiToolComponent,
              },
              {
                path: 'product-details/:name/:id',
               
                children: [
                  {
                    path: '',
                    component: SiteDetailsComponent,
                  },
                  {
                    path: 'sku-search',
                    component: SkuDashboardComponent,
                  },
                  {
                    path: 'keyword-search',
                    component: KeywordSearchComponent,
                  },
                  {
                    path: 'market-search',
                    component: MarkertsearchComponent,
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
                      },
                    ],
                  },
                  {
                    path: 'competitor-analysis',
                    component: CompetitorAnalysisComponent,
                  },
                ],
              },
            ],
          },
          {
            path: 'price_optimization',
            component: PriceOptimizationComponent,
          },
          {
            path: 'sentiment_analysis',
            component: SentimentAnalysisComponent,
          },
        ],
      },
    ],
  },
];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
  // {path:'', component: HomeComponent},
  
  // {
  //   path:'services',
  //   component: FullcomponentComponent,
  //   children: [
          
  //          {
  //           path: '',
  //           redirectTo: 'dashboard',
  //           pathMatch: 'full',
  //          },
  //          {path:'competitor-analyzer',
  //           component: CompititorAnalyzerComponent 
  //          },
  //          {
  //           path: 'dashboard',
  //           component: DashboardComponent,
  //         },
  //         {
  //           path: 'tools',
  //           children: [
  //             {
  //               path: 'mi_tools',
  //               children: [
  //                 {
  //                   path: '',
  //                   component: MiToolComponent,
  //                 },
  //                 {
  //                   path: 'product-details/:name/:id',
  //                   component: SiteDetailsComponent,
  //                 },
  //               ],
  //             },
  //             {
  //               path: 'price_optimization',
  //               component: PriceOptimizationComponent,
  //             },
  //             {
  //               path: 'sentiment_analysis',
  //               component: SentimentAnalysisComponent,
  //             },
  //           ],
  //         },
          
          // {
          //   //  path: 'tools/mi_tools/product-details/:name/:id',component: SiteDetailsComponent,
          // },
          // {
          //   path: 'tools/mi_tools/product-details/:name/:id/sku-search',component:SkuDashboardComponent
          // },
          // {
          //   path: 'tools/mi_tools/product-details/:name/:id/keyword-search',component:KeywordSearchComponent
          // },
          // {
          //   path: 'tools/mi_tools/product-details/:name/:id/market-search',component:MarkertsearchComponent,
          //   children: [
          //     { path: 'market-trend', component: MarketTrendComponent, outlet: 'content' },
          //     { path: 'market-leader', component: MarketLeaderComponent, outlet: 'content' },
          //     { path: 'innovation', component: InnovationComponent, outlet: 'content' },
          //     {
          //       path: 'search-result',
          //       component: MarketSearchResultComponent,
          //       outlet: 'content',
          //       children: [
          //         { path: 'search-result', component: NewsResultComponent, outlet: 'searchnews' },
          //         { path: 'news', component: MarketNewsComponent, outlet: 'searchnews' },
                 
          //       ]
          //     },
          
          //   ]
          // },
          // {
          //   path: 'tools/mi_tools/product-details/:name/:id/competitor-analysis',component:CompetitorAnalysisComponent
          // },
          // {
          //   path: 'tools/sentiment_analysis',component: SentimentAnalysisComponent 
          // }

          
          
        
//     ],
    

//   },
//   { path: '**',  
//     component: PagenotfoundComponent 
//   }, 
 





