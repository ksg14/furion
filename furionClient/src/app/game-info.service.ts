import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../environments/environment'
import { MatchDetails } from './match-details';
import { PlayerDetails } from './player-details';

@Injectable({
  providedIn: 'root'
})
export class GameInfoService {

  private dotaApiUrl: string = environment.dotaApiUrl;

  constructor(private http: HttpClient) { }

  private makeHeader (token: string) {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return headers
  }

  public getPlayerDetails (steam32ID: number, token: string): Observable<HttpResponse<PlayerDetails>> {
    return this.http.get<PlayerDetails>(`${this.dotaApiUrl}/details/${steam32ID}`, 
                                          { headers: this.makeHeader (token), observe: 'response'} );
  }

  public getRecentMatches (steam32ID: number, token: string): Observable<HttpResponse<MatchDetails []>> {
    return this.http.get<MatchDetails []>(`${this.dotaApiUrl}/recentMatches/${steam32ID}`, 
                                          { headers: this.makeHeader (token), observe: 'response'} );
  }

  public getDummyData () {
    return new PlayerDetails ( 2667, 
      "514",
      "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f7/f7b27b840abd9bc020fdacc549848f7a49a07db5_full.jpg",
      "Crusader 2",
      294, 266, 271, 511, 18, 34, 1, 2, 4, 13);
  }

  public getDummyMatches () {
    return [
      {
          "side": "Radiant",
          "win": true,
          "duration": 3933,
          "hero": "Faceless Void",
          "kills": 10,
          "death": 8,
          "assists": 22,
          "xpm": 652,
          "gpm": 559,
          "towerDamage": 8201,
          "lastHits": 436,
          "heroDamage": 39519
      },
      {
          "side": "Radiant",
          "win": true,
          "duration": 1600,
          "hero": "Sniper",
          "kills": 9,
          "death": 1,
          "assists": 9,
          "xpm": 625,
          "gpm": 517,
          "towerDamage": 6625,
          "lastHits": 147,
          "heroDamage": 20938
      }
    ]
  };
  
}
