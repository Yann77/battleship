package org.team.apps.board;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RandomShipGeneratorTest {

	@Test
	void generate() {
		Board board = RandomShipGenerator.generate();
		System.out.println(board);
	}
}