package org.team.apps.board;

public enum ShipType {

    CARRIER(5),
    BATTLESHIP(4),
    CRUISER(3),
    SUBMARINE(3),
    DESTROYER(2);

    int size;

    ShipType(int size) {
        this.size = size;
    }
}
