import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
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
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // TODO if local storage has email then navigate to home
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

  isErrorStatus (responseStatus: number): boolean {
    responseStatus = Math.floor (responseStatus / 100);

    if (responseStatus != 2)
      return true
    return false;
  }

  navigateToHome () {
    this.router.navigateByUrl('/home');
  }

  userRegister () {
    console.log ('register');
    console.log (this.loginForm.value);

    this.userService.saveUserOnDB (this.loginForm.value)
        .subscribe (async res => {
          console.log (`register response ${res.status}`);
          console.log (res.body);

          if (!this.isErrorStatus (res.status)) {
            const firebaseResponse = await this.userService.registerUserOnFirebase (this.loginForm.controls ['email'].value, 
                                                      this.loginForm.controls ['password'].value);
            if (firebaseResponse.status) {
              this.navigateToHome ();
            }
            else {
              this.openSnackBar (`Failure : Firebase Registration`, 'Close');
              // TODO remove user from mongoDB on firebase failure
            }
          }
          else {
            this.openSnackBar (`Failure : Mongo Registration`, 'Close');
          }
        },
        err => {
          this.openSnackBar (`${err.statusText}, StatusCode : ${err.status}`, 'Close');
        });
  }

  userLogin () {
    console.log ('login');
    console.log (this.loginForm.value);

    this.userService.isExistingUserOnDB (this.loginForm.controls ['email'].value)
        .subscribe (async res => {
          console.log (`login response ${res.status}`);
          console.log (res.body);

          if (!this.isErrorStatus (res.status) && res.body) {
            const firebaseResponse = await this.userService.loginUserOnFirebase (this.loginForm.controls ['email'].value, 
                                                      this.loginForm.controls ['password'].value);
            if (firebaseResponse.status) {
              this.navigateToHome ();
            }
            else {
              this.openSnackBar (`Failure : Firebase Login`, 'Close');
            }
          }
          else {
            this.openSnackBar (`Failure : Mongo Login`, 'Close');
          }
        },
        err => {
          this.openSnackBar (`${err.statusText}, StatusCode : ${err.status}`, 'Close');
        })
  }


  

}
