package org.team.apps.game;

public class JoinGameInputMessage {

	private String username;
	private Integer gameId;

	public String getUsername() {
		return username;
	}

	public void setUsername(final String username) {
		this.username = username;
	}

	public Integer getGameId() {
		return gameId;
	}

	public void setGameId(final Integer gameId) {
		this.gameId = gameId;
	}
}
