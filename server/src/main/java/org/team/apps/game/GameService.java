package org.team.apps.game;

import java.util.List;

import org.team.apps.board.Board;
import org.team.apps.board.BoardRepository;
import org.team.apps.board.BoardService;
import org.team.apps.board.RandomShipGenerator;
import org.team.apps.user.User;
import org.team.apps.user.UserRepository;

import org.springframework.transaction.annotation.Transactional;


public class GameService {

	private GameRepository gameRepository;
	private UserRepository userRepository;
	private BoardRepository boardRepository;

	public GameService(GameRepository gameRepository, UserRepository userRepository, BoardRepository boardRepository) {
		this.gameRepository = gameRepository;
		this.userRepository = userRepository;
		this.boardRepository =  boardRepository;
	}

	public List<Game> create(String username) {
		try {
			User user = new User();
			user.setUsername(username);
			userRepository.save(user);

			Game game = new Game();
			game.setHost(user);
			game.setStatus(GameStatus.CREATED.name());
			gameRepository.save(game);

			createBoard(user);

			return gameRepository.findAll();
		}
		catch (Exception e) {
			System.out.println(e);
			throw e;
		}
	}

	public void createBoard(User user) {
		Board board1 = RandomShipGenerator.generate();
		board1.setUser(user);
		boardRepository.save(board1);
	}

	public Game joinGame(JoinGameInputMessage joinGameInputMessage) {
		try {
			User user = new User();
			user.setUsername(joinGameInputMessage.getUsername());
			userRepository.save(user);

			createBoard(user);

			Game currentGame = gameRepository.findById(joinGameInputMessage.getGameId()).orElse(null);
			if(currentGame!=null) {
				currentGame.setGuest(user);
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
