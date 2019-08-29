package org.team.apps.game;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import org.team.apps.board.Board;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer gameId;

    @JoinColumn(name = "host", referencedColumnName="id")
    @OneToOne
    private Board host;

    @JoinColumn(name = "guest", referencedColumnName="id")
    @OneToOne
    private Board guest;

    private String status;

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public Board getHost() {
        return host;
    }

    public void setHost(Board host) {
        this.host = host;
    }

    public Board getGuest() {
        return guest;
    }

    public void setGuest(Board guest) {
        this.guest = guest;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
