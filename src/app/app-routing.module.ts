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

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'competitor-analyzer',component: CompititorAnalyzerComponent },
  {
    path:'services',
    component: FullcomponentComponent,
    children: [
           {
            path: '',
            redirectTo: 'dashboard',
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
             path: 'services/tools/mi_tools/product-details/Amazon/1',component: CountrydataComponent,
          },
          {
            path: 'services/competitor-analyzer', component: CompititorAnalyzerComponent,
            children: [
             
            ]
          },
          { 
            path: 'product-matrix-result', component: MatrixResultComponentComponent 
          },
          {
            path: 'review-sentiment-chart',component: ReviewSentimentChartComponent
          }

          
    ],
    

  },
  { path: '**', pathMatch: 'full',  
    component: PagenotfoundComponent }, 
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
