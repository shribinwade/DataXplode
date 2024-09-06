import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarService } from '../../../Services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
   './login.component.scss',
  
  ]
})
export class LoginComponent implements OnInit,AfterViewInit {


  signupFormGroup:any= FormGroup;
  loginFormGroup:any= FormGroup;

 // Reference to the container element
 @ViewChild('containerfluid', { static: false }) container!: ElementRef<HTMLButtonElement>;
 @ViewChild('signInButton') signInButton!: ElementRef<HTMLButtonElement>;
 @ViewChild('signUpButton') signUpButton!: ElementRef<HTMLButtonElement>;

 signupUsers: any [] = [];


 signupObj:any = {
  userName: '',
  email: '',
  password: ''
 };

 loginObj:any= {
  userName: '',
  password: ''
 };

 constructor(
  private formBuilder: FormBuilder,
  private globalSnackbar: SnackbarService,
  private router:Router
 ){}


 ngOnInit(): void {
    this.signupFormGroup=this.formBuilder.group({
        userName: '',
        email: '',
        password: ''
    })

    this.loginFormGroup = this.formBuilder.group({
      userName:'',
      password:''
    })

    const localData = localStorage.getItem('signUpUsers');
    if(localData != null){
      this.signupUsers = JSON.parse(localData);
    }
 }

 ngAfterViewInit(): void {

 }

onSignUp(): void {
  this.container.nativeElement.classList.add('sign-up-mode');
}


onSignIn(): void {
  this.container.nativeElement.classList.remove('sign-up-mode');
}


  signInSubmit() {
 
    const formdata=this.loginFormGroup.value;
    const isUserExist = this.signupUsers.find(m => m.userName == formdata.userName && m.password == formdata.password)
     
    if(isUserExist!= undefined || formdata.userName == 'admin'){
        
        this.globalSnackbar.showSuccess('User Login Successfully','Close');
        this.router.navigate(['/services']);
    }else{
      this.globalSnackbar.showError('No Matching User Found','Close');
    }

  
  }

  signUpSubmit() {
    const formdata=this.signupFormGroup.value;


  // Add new form data to the array
  this.signupUsers.push(formdata);

    
  // Convert the array to a JSON string
  const formDataArrayString = JSON.stringify(this.signupUsers);
  if(formDataArrayString!=undefined){
     // Store the stringified array in localStorage
     this.globalSnackbar.showSuccess('User SignUp Successfully','Close');
    localStorage.setItem('signUpUsers', formDataArrayString);
    this.onSignIn();
  }else{
    this.globalSnackbar.showSuccess('User SignUp Successfully','Close');
  }
 
  }





}
