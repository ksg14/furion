package gg.ez.furion.model;

import java.util.HashMap;

public class DotaConstants {
    private static final HashMap<Integer, String> ranks = new HashMap<>();
    private static final HashMap<String, String> laneRoles = new HashMap<>();
    private static final HashMap<Integer, String> heros = new HashMap<>();

    static {
        ranks.put (1, "Herald");
        ranks.put (2, "Guardian");
        ranks.put (3, "Crusader");
        ranks.put (4, "Archon");
        ranks.put (5, "Legend");
        ranks.put (6, "Ancient");
        ranks.put (7, "Divine");
        ranks.put (8, "Immortal");

        laneRoles.put ("SafeLane", "0");
        laneRoles.put ("MidLane", "1");
        laneRoles.put ("OffLane", "2");
        laneRoles.put ("Jungle", "3");

        heros.put (41, "Faceless Void");
        heros.put (35, "Sniper");
        heros.put (21, "Windranger");
        heros.put (10, "Morphling");
        heros.put (6, "Drow ranger");
        heros.put (114, "Monkey King");
        heros.put (45, "Pugna");
        heros.put (74, "Invoker");
        heros.put (30, "Witch Docter");
        heros.put (52, "Leshrac");
        heros.put (1, "Anti Mage");
        heros.put (26, "Lion");
        heros.put (27, "Shadow Shaman");
        heros.put (112, "Winter Wyvern");
        heros.put (75, "Silencer");
        heros.put (12, "Phantom Lancer");
    }

    public static String getRank (int rank) {
        return String.format ("%s %d", ranks.get(rank/10), rank%10);
    }

    public static String getLaneRole (String laneRole) {
        return laneRoles.get(laneRole);
    }

    public static String getHeroName (int heroId) {
        return heros.get(heroId);
    }
}
