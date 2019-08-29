package org.team.apps.board;

import java.util.List;


import org.team.apps.user.User;

import javax.persistence.*;


@Entity
public class Board {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", referencedColumnName = "id", nullable = false)
    private List<Cell> cellList;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Cell> getCellList() {
        return cellList;
    }

    public void setCellList(List<Cell> cellList) {
        this.cellList = cellList;
    }


}
