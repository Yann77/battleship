package org.team.apps.board;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RandomShipGenerator {

	private static final Random generator = new SecureRandom();

	public static Board generate() {

		Board board = new Board();
		List<Cell> shipCells = new ArrayList<>();

		for (ShipType shipType : ShipType.values()) {

			int startCoordLimit = generator.nextInt(10 - shipType.size);
			int startCoordOther = generator.nextInt(10);
			boolean isHorizontal = isHorizontal();


			for (int i = 0; i < shipType.size; i++) {
				Cell cell = setCell(isHorizontal, i, startCoordLimit, startCoordOther, shipType.name());
				shipCells.add(cell);
			}

		}
		board.setCellList(shipCells);

		return board;
	}

	private static Cell setCell(Boolean isHorizontal, int i, int startCoordLimit, int startCoordOther, String shipName) {
		return (isHorizontal) ? new Cell(shipName, startCoordLimit + i, startCoordOther) : new Cell(shipName, startCoordOther, startCoordLimit + i);
	}

	private static boolean isHorizontal() {
		return generator.nextBoolean();
	}


}
