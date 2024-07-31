import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private elementRef:ElementRef) { }


  @HostListener('click')
   prevFunc(){
    var elm=this.elementRef.nativeElement.parentElement.parentElement.children[0];
    var item = elm.getElementsByClassName("item");
    elm.prepend(item[item.length-1]);
   
    console.log(elm);
    console.log(item);
    // console.log(prev);
    
   }

}
