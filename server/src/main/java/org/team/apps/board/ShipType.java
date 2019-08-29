package org.team.apps.board;

public enum ShipType {

    CARRIER(5),
    BATTLESHIP(4),
	DESTROYER(3),
    SUBMARINE(3),
    PATROL_BOAT(2);

    int size;

    ShipType(int size) {
        this.size = size;
    }
}
