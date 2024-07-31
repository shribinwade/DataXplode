import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiWebComponent } from './ai-web/ai-web.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AutomationComponent } from './automation/automation.component';

const routes: Routes = [
  {
    path:'ai_web',component: AiWebComponent
  },
  {
    path:'analytics',component: AnalyticsComponent
  },
  {
    path:'automation', component: AutomationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
