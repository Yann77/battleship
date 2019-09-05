package org.team.apps.board;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RandomShipGenerator {

	private final static Logger logger = LoggerFactory.getLogger(RandomShipGenerator.class);

	private static final Random generator = new SecureRandom();

	public static Board generate() {
		long startTime = System.currentTimeMillis();

		Board board = new Board();
		List<Cell> allBoatsCells = new ArrayList<>();

		for (ShipType shipType : ShipType.values()) {
			allBoatsCells.addAll(generateBoatPositionWithoutCollision(shipType, allBoatsCells));
		}
		board.setCellList(allBoatsCells);

		long endTime = System.currentTimeMillis();
		System.out.println("Board generation : " + (endTime - startTime));
		return board;
	}

	private static List<Cell> generateBoatPositionWithoutCollision(ShipType shipType, List<Cell> allBoatsCells) {
		List<Cell> oneBoatCells = new ArrayList<>();
		boolean collision;

		do {
			collision = false;
			int startCoordLimit = generator.nextInt(10 - shipType.size);
			int startCoordOther = generator.nextInt(10);
			boolean isHorizontal = isHorizontal();

			for (int i = 0; i < shipType.size; i++) {
				Cell cell = setCell(isHorizontal, i, startCoordLimit, startCoordOther, shipType.name());
				cell.setTouched(false);
				oneBoatCells.add(cell);
			}

			for (Cell boatAlreadyCreated : allBoatsCells) {
				for (Cell newBoat : oneBoatCells) {
					if (newBoat.compareCoordinate(boatAlreadyCreated.getCoordinateX(), boatAlreadyCreated.getCoordinateY())) {
						logger.info("There is a collision : \n New boat : " + newBoat.getType() + " X:" + newBoat.getCoordinateX() + " Y:" + newBoat.getCoordinateY() +
								"\nBoat from collision : " + boatAlreadyCreated.getType() + " X:" + boatAlreadyCreated.getCoordinateX() + " Y:" + boatAlreadyCreated.getCoordinateY());
						oneBoatCells.clear();
						collision = true;
						break;
					}
				}
				if (collision) break;
			}
		} while (collision);

		return oneBoatCells;
	}

	private static Cell setCell(Boolean isHorizontal, int i, int startCoordLimit, int startCoordOther, String shipName) {
		return (isHorizontal) ? new Cell(shipName, startCoordLimit + i, startCoordOther) : new Cell(shipName, startCoordOther, startCoordLimit + i);
	}

	private static boolean isHorizontal() {
		return generator.nextBoolean();
	}


}
