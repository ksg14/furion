import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './user';
import { ServiceStatus } from './service-status'
import { environment } from '../environments/environment'
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private userAuthUrl: string = environment.usersApiUrl;;
  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth) {}

  public async loginUserOnFirebase (email: string, password: string): Promise<ServiceStatus> {
    try {
      const res = await this.firebaseAuth.signInWithEmailAndPassword (email, password);
      this.isAuthenticated = true;
      localStorage.setItem ('email', email);
    }
    catch (err) {
      return new ServiceStatus (false, JSON.stringify (err));
    }
    return new ServiceStatus (true, '');
  }

  public async registerUserOnFirebase (email: string, password: string): Promise<ServiceStatus> {
    try {
      const res = await this.firebaseAuth.createUserWithEmailAndPassword (email, password);
      this.isAuthenticated = true;
      localStorage.setItem ('email', email);
    }
    catch (err) {
      return new ServiceStatus (false, JSON.stringify (err));
    }
    return new ServiceStatus (true, '');
  }

  public logout () {
    this.isAuthenticated = false;
    this.firebaseAuth.signOut ();
    localStorage.removeItem('email');
  }

  public getAuthenticationStatus(): boolean {
    return this.isAuthenticated;
  }

  public getUserFromDB (email: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.userAuthUrl}/${email}`, {observe: 'response'});
  }

  public isExistingUserOnDB (email: string): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(`${this.userAuthUrl}/auth/${email}`, {observe: 'response'});
  }

  public saveUserOnDB (user: User): Observable<HttpResponse<string>>{
    return this.http.post<string>(this.userAuthUrl, user, {observe: 'response'});
  }
}
