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
    @SendTo("/topic/game/created")
    public List<Game> create(String username) {
        return gameService.create(username);
    }

}
