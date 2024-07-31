import { animate,style, transition, trigger } from '@angular/animations';
import { Component, NgZone } from '@angular/core';

interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
 
})
export class AppComponent {

  userHasAccessToDashboard: boolean=false;
  title = 'sidenav';
  isSideNavCollapsed = false;
  screenWidth = 0;


  selectedOption!: string;

  // onChange(event: any) {
  //   this.selectedOption = event.target.value;
  // }

  
  constructor(){
    // this.checkUserAccess();
  }
  // checkUserAccess() {
  //   // Replace this with your actual logic to check if the user has access
  //   // For example, you might fetch user roles from a service and set userHasAccessToDashboard accordingly
  //   // For demonstration purposes, let's assume access is granted based on some condition
  //   this.userHasAccessToDashboard = true; // Set to true if user should have access
  // }

  

  // onToggleSideNav(data: SideNavToggle):void {
  //     this.screenWidth = data.screenWidth;
  //     this.isSideNavCollapsed = data.collapsed;
  // }
}
