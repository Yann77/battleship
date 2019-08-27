package org.team.apps.game;

import java.util.List;

import org.team.apps.user.User;
import org.team.apps.user.UserRepository;

import org.springframework.transaction.annotation.Transactional;


public class GameService {

	private GameRepository gameRepository;
	private UserRepository userRepository;

	public GameService(GameRepository gameRepository, UserRepository userRepository) {
		this.gameRepository = gameRepository;
		this.userRepository = userRepository;
	}

	public List<Game> create(String username) {
		try {
			User user = new User();
			user.setUsername(username);
			userRepository.save(user);

			Game game = new Game();
			game.setHost(user);
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
			User user = new User();
			user.setUsername(joinGameInputMessage.getUsername());
			userRepository.save(user);

			Game currentGame = gameRepository.findById(joinGameInputMessage.getGameId()).orElse(null);
			if(currentGame!=null) {
				currentGame.setGuest(user);
				gameRepository.save(currentGame);
			}
			return currentGame;
		}
		catch (Exception e) {
			System.out.println(e);
			throw e;
		}
	}
}
