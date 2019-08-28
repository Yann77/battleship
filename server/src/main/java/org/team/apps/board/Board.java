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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "board")
    private List<Cell> cellList;

    @OneToOne
    private User user;

//    @OneToMany
//    private List<View> viewList;

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

//    public List<View> getViewList() {
//        return viewList;
//    }
//
//    public void setViewList(List<View> viewList) {
//        this.viewList = viewList;
//    }
}
