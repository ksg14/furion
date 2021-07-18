import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './user';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private userAuthUrl!: string;

  constructor(private http: HttpClient) {
    this.userAuthUrl = environment.usersApiUrl;
  }

  public getUser(email: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.userAuthUrl}/${email}`, {observe: 'response'});
  }

  public isExistingUser(email: string): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(`${this.userAuthUrl}/auth/${email}`, {observe: 'response'});
  }

  public saveUser(user: User): Observable<HttpResponse<string>>{
    return this.http.post<string>(this.userAuthUrl, user, {observe: 'response'});
  }
}
