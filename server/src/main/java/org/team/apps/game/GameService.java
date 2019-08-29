package org.team.apps.game;

import java.util.List;
import org.team.apps.board.Board;
import org.team.apps.board.BoardRepository;
import org.team.apps.board.RandomShipGenerator;


public class GameService {

	private GameRepository gameRepository;
	private BoardRepository boardRepository;

	public GameService(GameRepository gameRepository, BoardRepository boardRepository) {
		this.gameRepository = gameRepository;
		this.boardRepository =  boardRepository;
	}

	public List<Game> create(String username) {
		try {
			Board board = RandomShipGenerator.generate();
			board.setUsername(username);
			boardRepository.save(board);

			Game game = new Game();
			game.setHost(board);
			game.setStatus(GameStatus.CREATED.name());
			gameRepository.save(game);

			return gameRepository.findAll();
		}
		catch (Exception e) {
			System.out.println(e);
			throw e;
		}
	}

	public Game joinGame(JoinGameInputMessage joinGameInputMessage) {
		try {
			Board board = RandomShipGenerator.generate();
			board.setUsername(joinGameInputMessage.getUsername());
			boardRepository.save(board);

			Game currentGame = gameRepository.findById(joinGameInputMessage.getGameId()).orElse(null);
			if(currentGame!=null) {
				currentGame.setGuest(board);
				currentGame.setStatus(GameStatus.STARTED.name());
				gameRepository.save(currentGame);
			}
			return currentGame;
		}
		catch (Exception e) {
			System.out.println(e);
			throw e;
		}
	}

	public List<Game> findAll() {
		return gameRepository.findAll();
	}

	public Game update(Integer gameId) {
		//To change
		return gameRepository.findById(gameId).get();
	}

	public Game find(Integer gameId) {
		return gameRepository.findById(gameId).get();
	}
}
