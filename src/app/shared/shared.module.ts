import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';
import { ReadMoreDirective } from '../directives/ReadMore/read-more.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { ToolTipDirective } from '../directives/tooltip/tool-tip.directive';



@NgModule({
  declarations: [
    StarRatingComponent,
    ReadMoreDirective,
    CustomSnackBarComponent,

    ToolTipDirective
  
    
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule
    

  ],
  exports:[StarRatingComponent,
           ReadMoreDirective,
           BrowserAnimationsModule,
           CustomSnackBarComponent,
           ToolTipDirective
         
          
  ]
})
export class SharedModule { }
