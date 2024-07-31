import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { AiWebComponent } from './ai-web/ai-web.component';
import { AutomationComponent } from './automation/automation.component';
import { AnalyticsComponent } from './analytics/analytics.component';


@NgModule({
  declarations: [
    AiWebComponent,
    AutomationComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
