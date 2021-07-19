package gg.ez.furion.controller;

import com.fasterxml.jackson.databind.JsonNode;
import gg.ez.furion.model.MatchDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import gg.ez.furion.model.DotaConstants;
import gg.ez.furion.model.SteamDetails;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/dota")
@CrossOrigin(origins = "http://localhost:4200")
public class OpenDotaController {

    private static String openDotaUrl = "https://api.opendota.com/api/";

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/details/{id}")
    public ResponseEntity<SteamDetails> getSteamDetails (@PathVariable String id) {
        SteamDetails response = null;
        try {
            JsonNode playerResponse = this.restTemplate.getForObject(String.format("%s/players/%s", openDotaUrl, id), JsonNode.class);
            JsonNode winLossResponse = this.restTemplate.getForObject(String.format("%s/players/%s/wl", openDotaUrl, id), JsonNode.class);
            JsonNode countsResponse = this.restTemplate.getForObject(String.format("%s/players/%s/counts", openDotaUrl, id), JsonNode.class);
            assert playerResponse != null;
            assert winLossResponse != null;
            assert countsResponse != null;
            response = new SteamDetails(playerResponse.get ("mmr_estimate").get ("estimate").asInt(),
                     playerResponse.get("profile").get("personaname").textValue(),
                    playerResponse.get("profile").get("avatarfull").textValue(),
                    DotaConstants.getRank(playerResponse.get("rank_tier").asInt()),
                    winLossResponse.get("win").asInt(),
                    winLossResponse.get("lose").asInt(),
                    countsResponse.get("lane_role").get(DotaConstants.getLaneRole("SafeLane")).get("win").asInt(),
                    countsResponse.get("lane_role").get(DotaConstants.getLaneRole("SafeLane")).get("games").asInt(),
                    countsResponse.get("lane_role").get(DotaConstants.getLaneRole("MidLane")).get("win").asInt(),
                    countsResponse.get("lane_role").get(DotaConstants.getLaneRole("MidLane")).get("games").asInt(),
                    countsResponse.get("lane_role").get(DotaConstants.getLaneRole("OffLane")).get("win").asInt(),
                    countsResponse.get("lane_role").get(DotaConstants.getLaneRole("OffLane")).get("games").asInt(),
                    countsResponse.get("lane_role").get(DotaConstants.getLaneRole("Jungle")).get("win").asInt(),
                    countsResponse.get("lane_role").get(DotaConstants.getLaneRole("Jungle")).get("games").asInt()
                    );
        } catch (Exception err) {
            System.out.printf("GET /api/dota/details/{steam32id} error %s", err.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/recentMatches/{id}")
    public ResponseEntity<List<MatchDetails>> getRecentMatches (@PathVariable String id) {
        List<MatchDetails> response = new ArrayList<MatchDetails>();
        int slot;
        String side;
        boolean radiantWin, playerWin;
        try {
            JsonNode matchesResponse = this.restTemplate.getForObject(String.format("%s/players/%s/recentMatches", openDotaUrl, id), JsonNode.class);
            assert matchesResponse != null;
            for (JsonNode obj : matchesResponse) {

                slot = obj.get ("player_slot").asInt();
                radiantWin = obj.get("radiant_win").asBoolean();
                if (slot <= 127)
                    side = "Radiant";
                else
                    side = "Dire";

                playerWin = false;
                if (radiantWin && slot <= 127)
                    playerWin = true;
                else if (!radiantWin && slot > 127)
                    playerWin = true;

                response.add(new MatchDetails(side,
                        playerWin,
                        obj.get("duration").asInt(),
                        DotaConstants.getHeroName(obj.get("hero_id").asInt()),
                        obj.get("kills").asInt(),
                        obj.get("deaths").asInt(),
                        obj.get("assists").asInt(),
                        obj.get("xp_per_min").asInt(),
                        obj.get("gold_per_min").asInt(),
                        obj.get("tower_damage").asInt(),
                        obj.get("last_hits").asInt(),
                        obj.get("hero_damage").asInt()
                ));
            }
        } catch (Exception err) {
            System.out.printf("GET /api/dota/recentMatches/{steam32id} error %s", err.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(response);
    }

}
