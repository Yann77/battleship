package org.team.apps.game;

import java.util.List;

public class GameOutputMessage {

    private List<Game> games;

    public GameOutputMessage(List<Game> games) {
        this.games = games;
    }

    public GameOutputMessage() {
    }

    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }
}
