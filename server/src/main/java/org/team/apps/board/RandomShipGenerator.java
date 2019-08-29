package org.team.apps.board;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RandomShipGenerator {

	private static final Random generator = new SecureRandom();

	public static Board generate() {

		Board board = new Board();
		List<Cell> allBoatsCells = new ArrayList<>();

		for (ShipType shipType : ShipType.values()) {
			allBoatsCells.addAll(generateBoatPositionWithoutCollision(shipType, allBoatsCells));
		}
		board.setCellList(allBoatsCells);

		return board;
	}

	private static List<Cell> generateBoatPositionWithoutCollision(ShipType shipType, List<Cell> allBoatsCells){
		List<Cell> oneBoatCells = new ArrayList<>();
		boolean collision = true;

		while(collision) {
			int startCoordLimit = generator.nextInt(10 - shipType.size);
			int startCoordOther = generator.nextInt(10);
			boolean isHorizontal = isHorizontal();

			for (int i = 0; i < shipType.size; i++) {
				Cell cell = setCell(isHorizontal, i, startCoordLimit, startCoordOther, shipType.name());
				cell.setTouched(false);
				oneBoatCells.add(cell);
			}

			for(Cell boatAlreadyCreated : allBoatsCells){
				for(Cell newBoat : oneBoatCells){
					if(newBoat.compareCoordinate(boatAlreadyCreated.getCoordinateX(), boatAlreadyCreated.getCoordinateY())){
						break;
					}
				}
			}
			collision = false;
		}

		return oneBoatCells;
	}

	private static Cell setCell(Boolean isHorizontal, int i, int startCoordLimit, int startCoordOther, String shipName) {
		return (isHorizontal) ? new Cell(shipName, startCoordLimit + i, startCoordOther) : new Cell(shipName, startCoordOther, startCoordLimit + i);
	}

	private static boolean isHorizontal() {
		return generator.nextBoolean();
	}


}
