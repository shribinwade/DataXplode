import { animate,keyframes,style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

import { navbarData } from './side-nav';
import { INavbarData, fadeInOut } from './helper';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [
  fadeInOut,
    trigger('rotate',[
       transition(':enter',[
        animate('500ms',
          keyframes([
            style({transform: 'rotate(0deg',offset: '0'}),
            style({transform: 'rotate(0.5turn',offset: '1'})
          ])
        )
       ])
    ])
  ]
})
export class SidenavComponent implements OnInit{
   
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = true;

  @HostListener('window:resize',['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  constructor(public router: Router){

  }
 

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  getActiveClass(data: INavbarData): string{
         return this.router.url.includes(data.routeLink) ? 'active': ''
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  closeSidenav(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  handleClick(item: INavbarData): void{
     this.shrinkItems(item);
     item.expanded = !item.expanded
  }

  shrinkItems(item: INavbarData):void {
    if(!this.multiple){
      for(let modelItem of this.navData){
         if(item !== modelItem && modelItem.expanded){
          modelItem.expanded = false;
         }
      }
     }
  }
}
