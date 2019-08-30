package org.team.apps.game;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.team.apps.board.Cell;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

	private final Logger logger = LoggerFactory.getLogger(GameController.class);

	public GameController(GameService gameService) {
		this.gameService = gameService;
	}

	private GameService gameService;

	@MessageMapping("/game/create")
	@SendTo("/topic/game/get")
	public GameOutputMessage create(GameInputMessage gameInputMessage) {
		System.out.println(gameInputMessage.getUsername());
		List<Game> games = gameService.create(gameInputMessage.getUsername());
		return new GameOutputMessage(games);
	}

	@MessageMapping("/game/join")
	@SendTo("/topic/game/get")
	public GameOutputMessage join(JoinGameInputMessage joinGameInputMessage) {
		System.out.println("Game to join : "+ joinGameInputMessage.getGameId());
		gameService.joinGame(joinGameInputMessage);
		return new GameOutputMessage(gameService.findAll());
	}

	@MessageMapping("/game/get")
	@SendTo("/topic/game/get")
	public GameOutputMessage findAll() {
		List<Game> games = gameService.findAll();
		return new GameOutputMessage(games);
	}

	@MessageMapping("/game/get/{gameId}")
	@SendTo("/topic/game/get/{gameId}")
	public Game init(@DestinationVariable("gameId") Integer gameId) {
		Game game =  gameService.find(gameId);
		return game;
	}

	@MessageMapping("/game/fire/{gameId}")
	@SendTo("/topic/game/get/{gameId}")
	public Game fire(@DestinationVariable("gameId") Integer gameId, Cell cell) {
		return gameService.update(gameId, cell);
	}

	@MessageExceptionHandler
	@SendToUser("/topic/error")
	public String handleException(RuntimeException ex) {
		String msg = String.format("Oh no, there is an error %[s]", ex.getMessage());
		logger.error(msg, ex);
		return msg;
	}
}


