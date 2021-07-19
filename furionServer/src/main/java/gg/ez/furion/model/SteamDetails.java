package gg.ez.furion.model;

public class SteamDetails {
    private int mmrEstimate;
    private String alias;
    private String profilePic;
    private String rankStr;
    private int win;
    private int loss;
    private int safeLaneWins;
    private int safeLaneGames;

    public int getSafeLaneWins() {
        return safeLaneWins;
    }

    public void setSafeLaneWins(int safeLaneWins) {
        this.safeLaneWins = safeLaneWins;
    }

    public int getSafeLaneGames() {
        return safeLaneGames;
    }

    public void setSafeLaneGames(int safeLaneGames) {
        this.safeLaneGames = safeLaneGames;
    }

    public int getMidLaneWins() {
        return midLaneWins;
    }

    public void setMidLaneWins(int midLaneWins) {
        this.midLaneWins = midLaneWins;
    }

    public int getMidLaneGames() {
        return midLaneGames;
    }

    public void setMidLaneGames(int midLaneGames) {
        this.midLaneGames = midLaneGames;
    }

    public int getOffLaneWins() {
        return offLaneWins;
    }

    public void setOffLaneWins(int offLaneWins) {
        this.offLaneWins = offLaneWins;
    }

    public int getOffLaneGames() {
        return offLaneGames;
    }

    public void setOffLaneGames(int offLaneGames) {
        this.offLaneGames = offLaneGames;
    }

    public int getJungleWins() {
        return jungleWins;
    }

    public void setJungleWins(int jungleWins) {
        this.jungleWins = jungleWins;
    }

    public int getJungleGames() {
        return jungleGames;
    }

    public void setJungleGames(int jungleGames) {
        this.jungleGames = jungleGames;
    }

    private int midLaneWins;
    private int midLaneGames;
    private int offLaneWins;
    private int offLaneGames;
    private int jungleWins;
    private int jungleGames;

    public int getWin() {
        return win;
    }

    public void setWin(int win) {
        this.win = win;
    }

    public int getLoss() {
        return loss;
    }

    public void setLoss(int loss) {
        this.loss = loss;
    }

    public SteamDetails(int mmrEstimate, String alias, String profilePic,
                        String rankStr, int win, int loss, int safeLaneWins,
                        int safeLaneGames, int midLaneWins, int midLaneGames,
                        int offLaneWins, int offLaneGames, int jungleWins, int jungleGames) {
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

    public int getMmrEstimate() {
        return mmrEstimate;
    }

    public void setMmrEstimate(int mmrEstimate) {
        this.mmrEstimate = mmrEstimate;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getRankStr() {
        return rankStr;
    }

    public void setRankStr(String rankStr) {
        this.rankStr = rankStr;
    }
}
