package org.team.apps.game;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import org.team.apps.user.User;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Integer gameId;

    @JoinColumn(name = "host", referencedColumnName="user_id")
    @OneToOne
    private User host;

    @JoinColumn(name = "guest", referencedColumnName="user_id")
    @OneToOne
    private User guest;

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
    }

    public User getGuest() {
        return guest;
    }

    public void setGuest(User guest) {
        this.guest = guest;
    }
}
