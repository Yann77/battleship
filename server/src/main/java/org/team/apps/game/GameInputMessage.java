package org.team.apps.game;

public class GameInputMessage {

    public GameInputMessage(String username) {
        this.username = username;
    }

    public GameInputMessage() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    private String username;

}
