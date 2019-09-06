package org.team.apps.game;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.team.apps.board.Board;
import org.team.apps.board.BoardRepository;
import org.team.apps.board.Cell;
import org.team.apps.board.RandomShipGenerator;

import org.springframework.util.StringUtils;


public class GameService {

	private final static long ALL_BOATS_HIT = 17;
	private final static String MISSED = "MISSED";

	private GameRepository gameRepository;
	private BoardRepository boardRepository;

	private final Logger logger = LoggerFactory.getLogger(GameService.class);

	public GameService(GameRepository gameRepository, BoardRepository boardRepository) {
		this.gameRepository = gameRepository;
		this.boardRepository = boardRepository;
	}

	public Game create(String username) {
		try {
			Board board = RandomShipGenerator.generate();
			board.setUsername(username);
			boardRepository.save(board);

			Game game = new Game();
			game.setHost(board);
			game.setStatus(GameStatus.CREATED.name());
			gameRepository.save(game);

			return game;
		}
		catch (Exception e) {
			System.out.println(e);
			throw e;
		}
	}

	public Game joinGame(Integer gameId, String username) {
		try {
			Board board = RandomShipGenerator.generate();
			board.setUsername(username);
			boardRepository.save(board);

			Game currentGame = gameRepository.findById(gameId).orElse(null);
			if (currentGame != null) {
				currentGame.setGuest(board);
				currentGame.setStatus(GameStatus.HOST.name());
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

	public Game update(Integer gameId, Cell cell) {
		//Update Cell of the board that is attacked
		Game currentGame = gameRepository.findById(gameId).orElse(null);
		if (currentGame != null) {
			updateGameWithFire(currentGame, cell);
			gameRepository.saveAndFlush(currentGame);
		}

		return currentGame;
	}

	public Game find(Integer gameId) {
		return gameRepository.findById(gameId).get();
	}

	private void updateGameWithFire(Game game, Cell cell) {
		Board boardAttacked = null;
		String newGameStatus = game.getStatus();

		switch (game.getStatus()) {
		case "HOST":
			boardAttacked = game.getGuest();
			updateBoard(game.getGuest(), cell);
			game.setGuest(boardAttacked);
			newGameStatus = GameStatus.GUEST.name();
			break;
		case "GUEST":
			boardAttacked = game.getHost();
			updateBoard(boardAttacked, cell);
			game.setHost(boardAttacked);
			newGameStatus = GameStatus.HOST.name();
			break;
		default:
			//Throw an error, maybe on the error channel response
		}

		if (boardAttacked != null && boardAttacked.getCellList().stream().filter(boardCell -> boardCell.getTouched()).count() == ALL_BOATS_HIT) {
			newGameStatus = GameStatus.ENDED.name();
		}

		game.setStatus(newGameStatus);

		boardRepository.save(boardAttacked);

	}

	private void updateBoard(Board board, Cell cell) {
		List<Cell> currentCells = board.getCellList();
		boolean found = false;
		for (Cell boardCell: currentCells) {
			if (boardCell.compareCoordinate(cell.getCoordinateX(), cell.getCoordinateY())) {
				boardCell.setTouched(true);
				found = true;
			}
		}
		//add missed hit if no boat touched
		if (!found) {
			cell.setTouched(false);
			cell.setType(MISSED);
			currentCells.add(cell);
		}
	}

}
