import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './user';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userAuthUrl: string = environment.usersApiUrl;

  constructor(private http: HttpClient) {}

  private makeHeader (token: string) {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return headers
  }

  public getUserFromDB (email: string, token: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.userAuthUrl}/${email}`, { headers: this.makeHeader (token), observe: 'response' });
  }

  public isExistingUserOnDB (email: string, token:string): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(`${this.userAuthUrl}/auth/${email}`, { headers: this.makeHeader (token), observe: 'response'});
  }

  public saveUserOnDB (user: User, token: string): Observable<HttpResponse<string>>{
    return this.http.post<string>(this.userAuthUrl, user, { headers: this.makeHeader (token), observe: 'response'});
  }
}
