// import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

// @Directive({
//   selector: '[appReadMore]'
// })
// export class ReadMoreDirective implements AfterViewInit {


//   @Input() limit: number=50;             //to get the custom text limit
//   @Input() toggle: boolean = false;      //true: 'Read Less' button will be present

//   textSpan! : HTMLSpanElement;
//   btnSpan!  :HTMLSpanElement;

//   listeners: any[]= [];                  //add event listeners to unsubscribe all at the end

//   constructor(private el : ElementRef,private renderer : Renderer2) { }


//   ngAfterViewInit(): void {
//     //step 1  ---> change the text in HTML DOM element (<p>, <div>, <span>, <h1>, etc)
//     let text:string = this.el.nativeElement.innerHTML;

//     if(text.length > (this.limit))      //perform below logic only when text length exceeds limit
//     {
//       this.renderer.setProperty(this.el.nativeElement, 'innerHTML',text.substring(0,this.limit));

//     //step 2 ---> create txtSpan(remaining text) and btnSpan(Read More button)
//     this.textSpan = this.renderer.createElement('span');
//     this.btnSpan = this.renderer.createElement('span');
    
      
//     //step 3 ---> set initial properties and styles for both span elements
//     this.renderer.setProperty(this.textSpan, 'innerHTML',text.substring(this.limit));
//     this.renderer.setStyle(this.textSpan,'display','none');

//     this.renderer.setProperty(this.btnSpan,'innerHTML','Read More');

//     //below css properties are optional
//     this.renderer.setStyle(this.btnSpan,'cursor','pointer');
//     this.renderer.setStyle(this.btnSpan,'margin-left','1ch');
//     this.renderer.setStyle(this.btnSpan,'text-decoration','underline');
//     this.renderer.setStyle(this.btnSpan,'color','blue');

//     //step 4 ---> add onClick handler for 'Read More' button span
//     if(this.toggle)          //case when toggling needs to be enabled
//     {
//        this.listeners.push(this.renderer.listen(this.btnSpan,'click',()=>{
//         if(this.textSpan.style.display == 'none') //case when the text is hidden(default case)
//        {
//         this.renderer.setStyle(this.textSpan,'display','inline');
//         this.renderer.setProperty(this.btnSpan,'innerHTML','Read Less');
//        }
//        else //case when the text is visible
//        {
//         this.renderer.setStyle(this.textSpan,'display','none');
//         this.renderer.setProperty(this.btnSpan,'innerHTML','Read More');
//        }
//        }));

//     }
//     else   //case when toggling is off (only show text)
//     {
//        this.listeners.push(this.renderer.listen(this.btnSpan,'click',() =>{
//           this.renderer.setStyle(this.textSpan,'display','inline');
//           this.renderer.setStyle(this.btnSpan,'display','none');
//        }));
//     }

//     //step 5 ---> append both span to the HTML DOM element
//     this.renderer.appendChild(this.el.nativeElement,this.textSpan);
//     this.renderer.appendChild(this.el.nativeElement,this.btnSpan);

//   }

// }
// ngOnDestroy(): void {
//   this.listeners.forEach(val => val());
// }

// }
// import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

// @Directive({
//   selector: '[appReadMore]'
// })
// export class ReadMoreDirective implements AfterViewInit {
//   @Input() limit: number = 50; // to get the custom text limit
//   @Input() toggle: boolean = false; // true: 'Read Less' button will be present

//   fullText!: string;
//   truncatedText!: string;

//   listeners: any[] = []; // add event listeners to unsubscribe all at the end

//   constructor(private el: ElementRef, private renderer: Renderer2) {}

//   ngAfterViewInit(): void {
//     // step 1 ---> change the text in HTML DOM element (<p>, <div>, <span>, <h1>, etc)
//     this.fullText = this.el.nativeElement.innerHTML;

//     if (this.fullText.length > this.limit) { // perform below logic only when text length exceeds limit
//       this.truncatedText = this.fullText.substring(0, this.limit);

//       this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.truncatedText);

//       // step 2 ---> add onMouseEnter and onMouseLeave handlers for the element
//       this.listeners.push(this.renderer.listen(this.el.nativeElement, 'mouseenter', () => {
//         this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.fullText);
//       }));

//       this.listeners.push(this.renderer.listen(this.el.nativeElement, 'mouseleave', () => {
//         this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.truncatedText);
//       }));
//     }
//   }

//   ngOnDestroy(): void {
//     this.listeners.forEach(val => val());
//   }
// }

import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReadMore]'
})
export class ReadMoreDirective implements AfterViewInit {
  @Input() limit: number = 50; // to get the custom text limit
  @Input() toggle: boolean = false; // true: 'Read Less' button will be present

  fullText!: string;
  truncatedText!: string;

  listeners: any[] = []; // add event listeners to unsubscribe all at the end

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // step 1 ---> change the text in HTML DOM element (<p>, <div>, <span>, <h1>, etc)
    this.fullText = this.el.nativeElement.innerHTML;

    if (this.fullText.length > this.limit) { // perform below logic only when text length exceeds limit
      this.truncatedText = this.fullText.substring(0, this.limit);

      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.truncatedText);

      // step 2 ---> add a class to the element for animation
      this.renderer.addClass(this.el.nativeElement, 'read-more-animation');

      // step 3 ---> add onMouseEnter and onMouseLeave handlers for the element
      this.listeners.push(this.renderer.listen(this.el.nativeElement, 'mouseenter', () => {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.fullText);
      }));

      this.listeners.push(this.renderer.listen(this.el.nativeElement, 'mouseleave', () => {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.truncatedText);
      }));
    }
  }

  ngOnDestroy(): void {
    this.listeners.forEach(val => val());
  }
}



