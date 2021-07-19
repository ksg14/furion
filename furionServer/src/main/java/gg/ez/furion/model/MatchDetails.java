package gg.ez.furion.model;

public class MatchDetails {
    private String side;
    private boolean win;
    private int duration;
    private String hero;
    private int kills;
    private int deaths;
    private int assists;
    private int xpm;
    private int gpm;
    private int towerDamage;
    private int lastHits;
    private int heroDamage;

    public String getSide() {
        return side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public boolean isWin() {
        return win;
    }

    public void setWin(boolean win) {
        this.win = win;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getHero() {
        return hero;
    }

    public void setHero(String hero) {
        this.hero = hero;
    }

    public int getKills() {
        return kills;
    }

    public void setKills(int kills) {
        this.kills = kills;
    }

    public int getDeaths() {
        return deaths;
    }

    public void setDeaths(int deaths) {
        this.deaths = deaths;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getXpm() {
        return xpm;
    }

    public void setXpm(int xpm) {
        this.xpm = xpm;
    }

    public int getGpm() {
        return gpm;
    }

    public void setGpm(int gpm) {
        this.gpm = gpm;
    }

    public int getTowerDamage() {
        return towerDamage;
    }

    public void setTowerDamage(int towerDamage) {
        this.towerDamage = towerDamage;
    }

    public int getLastHits() {
        return lastHits;
    }

    public void setLastHits(int lastHits) {
        this.lastHits = lastHits;
    }

    public int getHeroDamage() {
        return heroDamage;
    }

    public void setHeroDamage(int heroDamage) {
        this.heroDamage = heroDamage;
    }

    public MatchDetails(String side, boolean win, int duration, String hero,
                        int kills, int deaths, int assists, int xpm, int gpm,
                        int towerDamage, int lastHits, int heroDamage) {
        this.side = side;
        this.win = win;
        this.duration = duration;
        this.hero = hero;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
        this.xpm = xpm;
        this.gpm = gpm;
        this.towerDamage = towerDamage;
        this.lastHits = lastHits;
        this.heroDamage = heroDamage;
    }
}
