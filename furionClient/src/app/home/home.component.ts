import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameInfoService } from '../game-info.service';
import { MatchDetails } from '../match-details';
import { PlayerDetails } from '../player-details';
import { User } from '../user';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  matchDetails!: MatchDetails[];
  playerDetails!: PlayerDetails;
  user!: User;

  winLossData: any[] | undefined = undefined;
  winLossView: [number, number] = [ 200, 300 ];
  winLossGradient: boolean = true;
  winLossShowLegend: boolean = true;
  winLossShowLabels: boolean = true;
  winLossIsDoughnut: boolean = false;
  winLossColorScheme = {
    domain: ['green', 'red']
  };

  laneWinsData: any[] | undefined = undefined;
  laneWinsView: [number, number] = [ 400, 300 ];
  laneWinsGradient: boolean = true;
  laneWinsShowLegend: boolean = true;
  laneWinsShowLabels: boolean = true;
  laneWinsIsDoughnut: boolean = false;
  laneWinsColorScheme = {
    domain: ['red', 'blue', 'purple', 'orange']
  };

  laneGamesData: any[] | undefined = undefined;
  laneGamesView: [number, number] = [ 400, 300 ];
  laneGamesGradient: boolean = true;
  laneGamesShowLegend: boolean = true;
  laneGamesShowLabels: boolean = true;
  laneGamesIsDoughnut: boolean = false;
  laneGamesColorScheme = {
    domain: ['red', 'blue', 'purple', 'orange']
  };

  constructor(private gameService: GameInfoService,
    private userService: UserAuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log (localStorage.getItem("email"))
    
    if (localStorage.getItem("email") != null) {
      this.loadPlayerDetails (localStorage.getItem("email")!);
    }
    
  }

  convertToMinutes (duration: number) {
    return Math.floor (duration / 60);
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

  loadPlayerDetails (email: string) {
    this.userService.getUserFromDB (email)
        .subscribe (userResponse => {
          console.log (`user response ${userResponse.status}`);
          console.log (userResponse.body);

          if (!this.isErrorStatus (userResponse.status) && userResponse.body) {
            this.user = userResponse.body;
            this.gameService.getPlayerDetails (this.user.steam32ID)
                .subscribe (detailsResponse => {
                  console.log (`details response ${detailsResponse.status}`);
                  console.log (detailsResponse.body);

                    if (!this.isErrorStatus (detailsResponse.status) && detailsResponse.body) {
                      this.playerDetails = detailsResponse.body;
                      this.loadWinLossData ();
                      this.loadLaneWinsData ();
                      this.loadLaneGamesData ();
                    }
                    else {
                      this.openSnackBar (`Failure : Mongo Load Game Details`, 'Close');
                    }
                },
                err => {
                  this.openSnackBar (`${err.statusText}, StatusCode : ${err.status}`, 'Close');
                });
                
            // TODO remove comments for dummyData
            // this.playerDetails = this.gameService.getDummyData ();
            // this.loadWinLossData ();
            // this.loadLaneWinsData ();
            // this.loadLaneGamesData ();

            this.gameService.getRecentMatches (this.user.steam32ID)
                .subscribe (matchResponse => {
                  console.log (`match response ${matchResponse.status}`);
                  console.log (matchResponse.body);

                  if (!this.isErrorStatus (matchResponse.status) && matchResponse.body) {
                    this.matchDetails = matchResponse.body;
                  }
                  else {
                    this.openSnackBar ('Failure: Matches Load error', 'Close');
                  }
                },
                err => {
                  this.openSnackBar (`${err.statusText}, StatusCode : ${err.status}`, 'Close');
                });
          }
          else {
            this.openSnackBar (`Failure : Mongo Load User Details`, 'Close');
          }
        },
        err => {
          this.openSnackBar (`${err.statusText}, StatusCode : ${err.status}`, 'Close');
        });
  }

  loadWinLossData () {
    this.winLossData = [
      {
        "name" : "Wins",
        "value" : this.playerDetails.win
      },
      {
        "name" : "Losses",
        "value" : this.playerDetails.loss
      }
    ];
  }

  loadLaneWinsData () {
    this.laneWinsData = [
      {
        "name" : "SafeLane",
        "value" : this.playerDetails.safeLaneWins
      },
      {
        "name" : "MidLane",
        "value" : this.playerDetails.midLaneWins
      },
      {
        "name" : "OffLance",
        "value" : this.playerDetails.offLaneWins
      },
      {
        "name" : "Jungle",
        "value" : this.playerDetails.jungleWins
      }
    ];
  }

  loadLaneGamesData () {
    this.laneGamesData = [
      {
        "name" : "SafeLane",
        "value" : this.playerDetails.safeLaneGames
      },
      {
        "name" : "MidLane",
        "value" : this.playerDetails.midLaneGames
      },
      {
        "name" : "OffLance",
        "value" : this.playerDetails.offLaneGames
      },
      {
        "name" : "Jungle",
        "value" : this.playerDetails.jungleGames
      }
    ];
  }

}
