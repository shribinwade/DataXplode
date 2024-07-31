import { Component, Input } from '@angular/core';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-fullcomponent',
  templateUrl: './fullcomponent.component.html',
  styleUrl: './fullcomponent.component.scss'
})
export class FullcomponentComponent {
   collapsed= false;
   screenWidth = 0;
  
  
  constructor(){
  
  }

  onToggleSideNav(data: SideNavToggle):void {
      this.screenWidth = data.screenWidth;
      this.collapsed = data.collapsed;
  }
  
  getBodyClass(): string {
   
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
         styleClass = 'body-md-screen'
    }
     return styleClass;

  }
}
