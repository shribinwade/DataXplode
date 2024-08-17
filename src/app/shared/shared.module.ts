import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';
import { ReadMoreDirective } from '../directives/ReadMore/read-more.directive';



@NgModule({
  declarations: [
    StarRatingComponent,
    ReadMoreDirective
    
  ],
  imports: [
    CommonModule,
    

  ],
  exports:[StarRatingComponent,
    ReadMoreDirective
  ]
})
export class SharedModule { }
