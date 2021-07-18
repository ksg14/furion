import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AppRoutingModule } from '../app-routing.module';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email : new FormControl ('', [Validators.required, Validators.email]),
    password : new FormControl ('', [Validators.required, Validators.minLength(8)]),
    steam32ID : new FormControl ('', [Validators.required, Validators.pattern("^[0-9]{9}$")])
  });

  hidePassword : boolean = true;

  constructor(private userService: UserAuthService, 
    private router: AppRoutingModule,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    if (this.loginForm.controls ['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls ['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPassWordErrorMessage() {
    if (this.loginForm.controls ['password'].hasError('minlength')) {
      return 'Password must be atleast 8 characters long.';
    }

    return this.loginForm.controls ['password'].hasError('required') ? 'You must enter a value' : '';
  }

  getSteamIDErrorMessage() {
    if (this.loginForm.controls ['steam32ID'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls ['steam32ID'].hasError('pattern') ? 'Not a valid Steam32ID' : '';
  }

  pristineAllFields () {
    this.loginForm.controls ['email'].reset ();
    this.loginForm.controls ['password'].reset ();
    this.loginForm.controls ['steam32ID'].reset ();
    this.hidePassword = true;
  }

  tabClick (tabEvent: MatTabChangeEvent) {
    // this.pristineAllFields ();
  }

  openSnackBar (message: string, action: string) {
    this.snackBar.open (message, action);
  }

  hasFailed (responseStatus: number, action: string): boolean {
    responseStatus /= 100;

    if (responseStatus == 4 || responseStatus == 5) {
      this.openSnackBar (`Failure : ${action}`, 'Close');
      return true;
    }
    return false;
  }

  userRegister () {
    console.log ('register');
    console.log (this.loginForm.value);

    this.userService.saveUser (this.loginForm.value)
        .subscribe (res => {
          console.log (`register response ${res.status}`);
          console.log (`register response ${res.body}`);

          this.hasFailed (res.status, 'Registration');
        },
        err => {
          this.openSnackBar (`${err.statusText}, StatusCode : ${err.status}`, 'Close');
        });
  }

  userLogin () {
    console.log ('login');
    console.log (this.loginForm.value);

    this.userService.isExistingUser (this.loginForm.controls ['email'].value)
        .subscribe (res => {
          console.log (`login response ${res.status}`);
          console.log (`login response ${res.body}`);

          this.hasFailed (res.status, 'Login');
        },
        err => {
          this.openSnackBar (`${err.statusText}, StatusCode : ${err.status}`, 'Close');
        })
  }


  

}
