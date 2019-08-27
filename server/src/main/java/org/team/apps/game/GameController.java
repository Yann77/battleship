package org.team.apps.game;

import java.util.List;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

public class GameController {

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    private GameService gameService;

    @MessageMapping("/game/create")
    @SendTo("/game/created")
    public List<Game> create(String username) {
        System.out.println("je suis ici");
        return gameService.create(username);
    }

}
