import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private elementRef:ElementRef) {
    // console.log(this.elementRef.nativeElement);
   }
 
   @HostListener('click')
   nextFunc(){
    
    let elm=this.elementRef.nativeElement.parentElement.parentElement.children[0];
    let item = elm.getElementsByClassName("item");
    elm.append(item[0]);
    console.log(elm);
    console.log(elm);
    
    
   }

}
