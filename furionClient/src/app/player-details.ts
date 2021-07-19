export class PlayerDetails {
    mmrEstimate!: number;
    alias!: string;
    profilePic!: string;
    rankStr!: string;
    win!: number;
    loss!: number;
    safeLaneWins!: number;
    safeLaneGames!: number;
    midLaneWins!: number;
    midLaneGames!: number;
    offLaneWins!: number;
    offLaneGames!: number;
    jungleWins!: number;
    jungleGames!: number;

    constructor (mmrEstimate: number, alias: string, profilePic: string, 
        rankStr: string, win: number, loss: number, safeLaneWins: number, safeLaneGames: number, 
        midLaneWins: number, midLaneGames: number, offLaneWins: number, offLaneGames: number, 
        jungleWins: number, jungleGames: number) {
            this.mmrEstimate = mmrEstimate;
            this.alias = alias;
            this.profilePic = profilePic;
            this.rankStr = rankStr;
            this.win = win;
            this.loss = loss;
            this.safeLaneWins = safeLaneWins;
            this.safeLaneGames = safeLaneGames;
            this.midLaneWins = midLaneWins;
            this.midLaneGames = midLaneGames;
            this.offLaneWins = offLaneWins;
            this.offLaneGames = offLaneGames;
            this.jungleWins = jungleWins;
            this.jungleGames = jungleGames;
        }
}
