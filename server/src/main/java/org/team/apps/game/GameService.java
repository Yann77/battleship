package org.team.apps.game;

import java.util.List;
import org.team.apps.user.User;
import org.team.apps.user.UserRepository;

public class GameService {

    private GameRepository gameRepository;
    private UserRepository userRepository;

    public GameService(GameRepository gameRepository, UserRepository userRepository) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }

    public List<Game> create(String username) {
        User user = new User();
        user.setUsername(username);
        userRepository.save(user);

        Game game = new Game();
        game.setHost(user);
        gameRepository.save(game);

        return gameRepository.findAll();
    }
}
