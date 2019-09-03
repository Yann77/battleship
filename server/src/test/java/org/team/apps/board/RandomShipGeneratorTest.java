package org.team.apps.board;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RandomShipGeneratorTest {

	@Test
	void generate() {
		Board board = RandomShipGenerator.generate();

		//Cell missedCell1 = new Cell(ShipType.MISSED.name(), 9, 9, null, null);
		//board.getCellList().add(missedCell1);
		System.out.println(board);
	}
}