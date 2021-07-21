import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth) { }

  public async loginUserOnFirebase (email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword (email, password);
  }

  public async registerUserOnFirebase (email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword (email, password);
  }

  public async getToken (): Promise<string | undefined> {
    const user = await this.firebaseAuth.currentUser;
    return user?.getIdToken ();
  }

  public isAuthenticated () {
    console.log (localStorage);
    if (localStorage && localStorage.getItem ('email') && localStorage.getItem ('token'))
      return true;
    return false;
  }

  public saveEmailAndTokenToLocalStorage (email: string, token: string) {
    localStorage.setItem ('email', email);
    localStorage.setItem ('token', token);
  }

  public logout () {
    this.firebaseAuth.signOut ();
    localStorage.removeItem ('email');
    localStorage.removeItem ('token');
  }
}
