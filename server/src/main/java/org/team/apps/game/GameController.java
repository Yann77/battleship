package org.team.apps.game;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.team.apps.board.Cell;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

	private final Logger logger = LoggerFactory.getLogger(GameController.class);

	@Autowired
	private SimpMessagingTemplate template;

	public GameController(GameService gameService) {
		this.gameService = gameService;
	}

	private GameService gameService;

//	@MessageMapping("/game/create")
//	@SendTo("/topic/game/get")
//	public GameOutputMessage create(String username) {
//		System.out.println(username);
//		List<Game> games = gameService.create(username);
//		return new GameOutputMessage(games);
//	}

	@MessageMapping("/game/create")
	@SendTo("/topic/game/get")
	public Game create(String username) {
		System.out.println("Creating a game for " + username);
		Game game = gameService.create(username);
		this.template.convertAndSend("/topic/game/get/" + game.getGameId(), game);
		return game;
	}

	@MessageMapping("/game/join/{gameId}")
	@SendTo("/topic/game/get/{gameId}")
	public Game join(@DestinationVariable("gameId") Integer gameId, String username) {
		System.out.println("Joining game : "+ gameId);
		return gameService.joinGame(gameId, username);
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


