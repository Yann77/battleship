package org.team.apps.game;

import java.util.ArrayList;
import java.util.List;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    private GameService gameService;

    @MessageMapping("/game/create")
    @SendTo("/topic/game/created")
    public GameOutputMessage create(GameInputMessage gameInputMessage) {
        System.out.println(gameInputMessage.getUsername());
        List<Game> games = gameService.create(gameInputMessage.getUsername());
        return new GameOutputMessage(games);
    }

    @MessageMapping("/game/example")
    @SendTo("/topic/game/example")
    public GameOutputMessage createExample(GameInputMessage gameInputMessage) {
        System.out.println(gameInputMessage.getUsername());
        return new GameOutputMessage(new ArrayList<>());
    }

}
