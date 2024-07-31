import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('toggleIcon', [
        state('open', style({
            transform: 'rotate(0deg)'
        })),
        state('closed', style({
            transform: 'rotate(0deg)'
        })),
        transition('open <=> closed', animate('0.3s ease-out'))
    ])
]
})
export class HomeComponent implements OnInit  {
  isOpen: boolean = false;
  isOffcanvasOpen = false;
 
  constructor(private dialog:MatDialog) {
   
}

  ngOnInit(): void {}


  
  handleSignupAction():void{
   
     const dialogConfig = new MatDialogConfig();
     dialogConfig.width = "550px";
     this.dialog.open(SignupComponent,dialogConfig)
  }

  toggleMenu(): void {
      this.isOpen = !this.isOpen;
      this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  handleLogin(){

  }
 
  
  ResearchCard = [
    {header:'Product Research', content: 'Discover profitable products', link: 'Learn More' },
    {header:'Market Research', content: 'Discover profitable Markets', link: 'Learn More' },
    {header:'Keyword Research', content: 'Improve your keyword targeting', link: 'Learn More' },
    {header:'Organizational Research', content: 'Improve your organization targeting', link: 'Learn More' },
    {header:'Analytics ',       content: 'Elevate product performance', link: 'Learn More' },
    
  
  ];

 


}
